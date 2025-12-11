
import { Request, Response } from 'express';
import BuyoutApplication from '../models/BuyoutApplication';

export const createApplication = async (req: Request, res: Response) => {
    try {
        const application = await BuyoutApplication.create({
            ...req.body,
            userId: (req as any).user._id // Assuming auth middleware attaches user
        });
        res.status(201).json({ success: true, data: application });
    } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const getMyApplications = async (req: Request, res: Response) => {
    try {
        const applications = await BuyoutApplication.find({ userId: (req as any).user._id });
        res.json({ success: true, data: applications });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getApplicationById = async (req: Request, res: Response) => {
    try {
        const application = await BuyoutApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }
        // Check ownership or admin
        if (application.userId.toString() !== (req as any).user._id.toString() && (req as any).user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized' });
        }
        res.json({ success: true, data: application });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    // Admin only typically
    try {
        const application = await BuyoutApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }
        application.status = req.body.status;
        await application.save();
        res.json({ success: true, data: application });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
