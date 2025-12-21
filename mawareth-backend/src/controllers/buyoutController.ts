import { Request, Response } from 'express'; // Import types for Express
import BuyoutApplication from '../models/BuyoutApplication'; // Import BuyoutApplication model

// Create a new buyout application
export const createApplication = async (req: Request, res: Response) => {
    try {
        const application = await BuyoutApplication.create({ // Create application in DB
            ...req.body, // Spread body properties
            applicantId: (req as any).user._id // Set applicant ID from authenticated user
        });
        res.status(201).json({ success: true, data: application }); // Return created application
    } catch (error: any) {
        res.status(400).json({ success: false, error: error.message }); // Return error
    }
};

// Get applications for the current user
export const getMyApplications = async (req: Request, res: Response) => {
    try {
        const applications = await BuyoutApplication.find({ applicantId: (req as any).user._id }); // Find applications by applicant ID
        res.json({ success: true, data: applications }); // Return found applications
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Get a single application by ID
export const getApplicationById = async (req: Request, res: Response) => {
    try {
        const application = await BuyoutApplication.findById(req.params.id); // Find application by ID
        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' }); // Return 404 if not found
        }
        // Check ownership or admin
        const requestingUser = (req as any).user; // Get requesting user
        const isAdmin = requestingUser.role === 'admin' || requestingUser.role === 'super_admin'; // Check if admin

        if (application.applicantId.toString() !== requestingUser._id.toString() && !isAdmin) { // Authorization check
            return res.status(401).json({ success: false, error: 'Not authorized' }); // Return 401 if not authorized
        }
        res.json({ success: true, data: application }); // Return application data
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Update application status (Admin only)
export const updateStatus = async (req: Request, res: Response) => {
    // Admin only typically
    try {
        const application = await BuyoutApplication.findById(req.params.id); // Find application
        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' }); // Return 404
        }
        application.status = req.body.status; // Update status
        await application.save(); // Save changes
        res.json({ success: true, data: application }); // Return updated application
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};
