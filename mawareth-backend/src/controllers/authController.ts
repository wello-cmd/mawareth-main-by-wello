
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authMiddleware';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, phone, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'heir',
        });

        if (user) {
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                session: {
                    token: generateToken(user._id.toString()),
                }
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password as string))) {
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                session: {
                    token: generateToken(user._id.toString()),
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getMe = async (req: AuthRequest, res: Response) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
};
