
import { Request, Response } from 'express';
import Estate, { IEstate } from '../models/Estate';

export const getEstates = async (req: Request, res: Response) => {
    try {
        const status = req.query.status;
        const filter = status ? { status } : {};
        const estates = await Estate.find(filter);
        res.json({ success: true, data: estates });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getEstateById = async (req: Request, res: Response) => {
    try {
        const estate = await Estate.findById(req.params.id);
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' });
        }
        res.json({ success: true, data: estate });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createEstate = async (req: Request, res: Response) => {
    try {
        const estate = await Estate.create(req.body);
        res.status(201).json({ success: true, data: estate });
    } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const updateVote = async (req: Request, res: Response) => {
    const { estateId } = req.params;
    const { heirId, vote } = req.body;

    try {
        const estate = await Estate.findById(estateId);
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' });
        }

        const heir = estate.heirs.find((h: any) => h._id.toString() === heirId || h.userId === heirId);
        if (heir) {
            heir.vote = vote;
            // Recalculate consensus driven by votes potentially, but for now just save
            await estate.save();
            res.json({ success: true, data: estate });
        } else {
            res.status(404).json({ success: false, error: 'Heir not found in estate' });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateConsensus = async (req: Request, res: Response) => {
    const { estateId } = req.params;
    const { vote } = req.body;

    try {
        const estate = await Estate.findById(estateId);
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' });
        }

        if (estate.consensus) {
            if (vote === 'accept') {
                estate.consensus.accepted += 1;
            }
            await estate.save();
        }
        res.json({ success: true, data: estate });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteEstate = async (req: Request, res: Response) => {
    try {
        const estate = await Estate.findById(req.params.id);
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' });
        }
        await estate.deleteOne();
        res.json({ success: true, daa: {} });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
