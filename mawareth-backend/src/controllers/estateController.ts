import { Request, Response } from 'express'; // Import types for Express Request and Response
import Estate, { IEstate } from '../models/Estate'; // Import Estate model and interface

// Get all estates with optional status filter
export const getEstates = async (req: Request, res: Response) => {
    try {
        const status = req.query.status; // Get status from query parameters
        const filter = status ? { status } : {}; // Create filter object if status is provided
        const estates = await Estate.find(filter); // Find estates with filter
        res.json({ success: true, data: estates }); // Return found estates
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Get single estate by ID
export const getEstateById = async (req: Request, res: Response) => {
    try {
        const estate = await Estate.findById(req.params.id); // Find estate by ID
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' }); // Return 404 if not found
        }
        res.json({ success: true, data: estate }); // Return estate data
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Create a new estate
export const createEstate = async (req: Request, res: Response) => {
    try {
        const { title, address, city, propertyType, area, marketValuation, solhAskPrice, description, heirs, deceasedName } = req.body;

        // Generate unique voting token
        const crypto = require('crypto');
        const votingToken = crypto.randomBytes(16).toString('hex');

        const estate = await Estate.create({
            ...req.body,
            votingToken, // Add unique token
            status: 'voting',
            consensus: {
                accepted: 0,
                total: heirs?.length || 0
            }
        });
        res.status(201).json({ success: true, data: estate }); // Return created estate
    } catch (error: any) {
        res.status(400).json({ success: false, error: error.message }); // Return error if creation failed
    }
};

// Update heir vote on an estate
export const updateVote = async (req: Request, res: Response) => {
    const { estateId } = req.params; // Get estate ID from params
    const { nationalId, vote } = req.body; // Expect nationalId for KYC and vote decision

    try {
        const estate = await Estate.findById(estateId); // Find estate
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' }); // Return 404 if not found
        }

        // Find heir by National ID (Strict Identity Verification)
        const heir = estate.heirs.find((h: any) => h.nationalId === nationalId); // Locate heir in the estate's heir list

        if (!heir) {
            return res.status(401).json({ success: false, error: 'Identity Verification Failed: National ID not found in estate heirs.' }); // Return 401 if heir not found
        }

        // Update Vote Status
        // Map frontend 'agree'/'disagree' to schema 'sell'/'keep'
        const mappedVote = vote === 'agree' ? 'sell' : 'keep';
        heir.vote = mappedVote;

        // Also update voteStatus if it exists on the schema for legacy support
        if (heir.voteStatus) heir.voteStatus = vote;

        // Check for Global Consensus
        // Logic: All heirs must have vote === 'sell' to reach consensus
        const allAgreed = estate.heirs.every((h: any) => h.vote === 'sell');

        if (allAgreed) {
            // Consensus Reached: Unlock Marketplace Listing
            // We use a specific status to indicate readiness
            estate.status = 'val_consensus' as any; // Using a temp status or need to update Schema. 
            // Lets stick to what user asked: Consensus_Reached
            estate.status = 'Consensus_Reached' as any;
        }

        // Update Consensus Stats explicitly for Frontend Slides/ProgressBar
        const sellVotes = estate.heirs.filter((h: any) => h.vote === 'sell').length;
        const totalHeirs = estate.heirs.length;

        estate.consensus = {
            accepted: sellVotes,
            total: totalHeirs
        };

        await estate.save(); // Save changes to database
        res.json({ success: true, data: estate }); // Return updated estate

    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Update consensus (Deprecated in favor of updateVote)
// updateConsensus is likely deprecated/redundant now that vote drives consensus automatically
// Keeping a stub or removing could be valid, but let's keep it restricted or redirecting
export const updateConsensus = async (req: Request, res: Response) => {
    return res.status(400).json({ success: false, error: 'Use updateVote endpoint with National ID' }); // Inform client to use correct endpoint
};

// Delete an estate
export const deleteEstate = async (req: Request, res: Response) => {
    try {
        const estate = await Estate.findById(req.params.id); // Find estate to delete
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' }); // Return 404 if not found
        }
        await estate.deleteOne(); // Delete estate from database
        res.json({ success: true, data: {} }); // Return success
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};
