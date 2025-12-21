import { Request, Response } from 'express'; // Import types for Express Request and Response
import User from '../models/User'; // Import User model
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for creating auth tokens
import { AuthRequest } from '../middleware/authMiddleware'; // Import custom AuthRequest interface

// Helper function to generate JWT token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { // Sign token with user ID and secret
        expiresIn: '30d', // Set token expiration to 30 days
    });
};

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, phone, role } = req.body; // Destructure user data from request body

    try {
        const userExists = await User.findOne({ email }); // Check if user already exists
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' }); // Return error if user exists
        }

        const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password with salt

        // Admin Approval Logic
        const isProtectedRole = role === 'admin' || role === 'super_admin' || role === 'moderator'; // Check if role requires approval
        const isVerified = !isProtectedRole; // Heirs/Investors are auto-verified, admins/moderators are not

        const user = await User.create({ // Create new user in database
            name,
            email,
            phone,
            passwordHash: hashedPassword,
            role: role || 'heir', // Default role is heir
            isVerified,
            promotedBy: null // Self-registered
        });

        if (user) { // If user created successfully
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified
                },
                session: { // Always return token so they can be routed to "Pending Approval" page
                    token: generateToken(user._id.toString()),
                },
                message: isProtectedRole ? 'Registration successful. Account pending admin approval.' : 'Registration successful.'
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' }); // Return error if creation failed
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Return server error
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body; // Destructure login credentials

    try {
        const user = await User.findOne({ email }); // Find user by email

        if (user && (await bcrypt.compare(password, user.passwordHash as string))) { // Verify password
            // We NO LONGER block unverified admins here. We Issue the token so the Frontend can show the "Pending Approval" page.

            res.json({ // Return user data and token on success
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified // Frontend MUST check this
                },
                session: {
                    token: generateToken(user._id.toString()),
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' }); // Return error for invalid credentials
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Return server error
    }
};

// Get current user profile
export const getMe = async (req: AuthRequest, res: Response) => {
    if (req.user) { // If user is attached to request (by middleware)
        res.json(req.user); // Return user data
    } else {
        res.status(404).json({ error: 'User not found' }); // Return error if user not found (shouldn't happen if auth middleware works)
    }
};
