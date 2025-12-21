import jwt from 'jsonwebtoken'; // Import JWT library
import { Request, Response, NextFunction } from 'express'; // Import Express types
import User, { IUser } from '../models/User'; // Import User model

// Extend Express Request to include user object
export interface AuthRequest extends Request {
    user?: IUser;
}

// Middleware to protect routes and ensure authentication
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    // Check for Bearer token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract token
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret123'); // Verify token

            const user = await User.findById(decoded.id).select('-password'); // Find user associated with token (exclude password)
            if (!user) {
                return res.status(401).json({ error: 'Not authorized, user not found' }); // Error if user not found
            }

            req.user = user; // Attach user to request object

            // Enforce Admin Verification
            if ((user.role === 'admin' || user.role === 'super_admin') && !user.isVerified) { // Check if admin is verified
                return res.status(403).json({ error: 'Account pending approval. Please contact a Super Admin.' }); // Block unverified admins
            }

            next(); // Proceed to next middleware/controller
        } catch (error) {
            console.error(error); // Log error
            res.status(401).json({ error: 'Not authorized, token failed' }); // Error if token invalid
        }
    }

    if (!token) { // Use 'if' instead of 'else' to handle missing token cleanly
        res.status(401).json({ error: 'Not authorized, no token' }); // Error if no token provided
    }
};
