
import { Request, Response } from 'express';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.json({ success: true, data: users });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Check if user is updating themselves or is admin
        if (user._id.toString() !== (req as any).user._id.toString() && (req as any).user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized' });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: updatedUser });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Only admin or the user themselves can delete account
        if (user._id.toString() !== (req as any).user._id.toString() && (req as any).user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized' });
        }

        await user.deleteOne();
        res.json({ success: true, data: {} });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
