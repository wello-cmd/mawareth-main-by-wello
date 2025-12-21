import { Request, Response } from 'express'; // Import types for Express Request and Response
import User from '../models/User'; // Import User model

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}); // Fetch all users from database
        res.json({ success: true, data: users }); // Return users
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Get single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id); // Find user by ID from URL params
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' }); // Return 404 if not found
        }
        res.json({ success: true, data: user }); // Return user data
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Update user details
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id); // Find user to update
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' }); // Return 404 if not found
        }

        // Check if user is updating themselves or is admin
        const requestingUser = (req as any).user; // Get requesting user from middleware
        // Check if user is updating themselves or is admin/super_admin
        const isAdmin = requestingUser.role === 'admin' || requestingUser.role === 'super_admin';

        if (user._id.toString() !== requestingUser._id.toString() && !isAdmin) { // Authorization check
            return res.status(401).json({ success: false, error: 'Not authorized' }); // Return 401 if not authorized
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update user and return new document
        res.json({ success: true, data: updatedUser }); // Return updated user
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Delete user account
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id); // Find user to delete
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' }); // Return 404 if not found
        }

        // Only admin/super_admin or the user themselves can delete account
        const requestingUser = (req as any).user; // Get requesting user
        const isAdmin = requestingUser.role === 'admin' || requestingUser.role === 'super_admin';

        if (user._id.toString() !== requestingUser._id.toString() && !isAdmin) { // Authorization check
            return res.status(401).json({ success: false, error: 'Not authorized' }); // Return 401 if not authorized
        }

        await user.deleteOne(); // Delete user from database
        res.json({ success: true, data: {} }); // Return success with empty data
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};
