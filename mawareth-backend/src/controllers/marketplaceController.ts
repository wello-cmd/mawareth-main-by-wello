
import { Request, Response } from 'express';
import MarketplaceListing from '../models/MarketplaceListing';

export const getListings = async (req: Request, res: Response) => {
    try {
        const listings = await MarketplaceListing.find({});
        res.json({ success: true, data: listings });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getListingById = async (req: Request, res: Response) => {
    try {
        const listing = await MarketplaceListing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }
        res.json({ success: true, data: listing });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const unlockListing = async (req: Request, res: Response) => {
    try {
        const listing = await MarketplaceListing.findById(req.params.listingId);
        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }
        // In a real app we would check payment confirmation here
        listing.isLocked = false;
        await listing.save();
        res.json({ success: true, data: listing });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const placeBid = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body;
        const listing = await MarketplaceListing.findById(req.params.listingId);

        if (!listing || !listing.auction) {
            return res.status(404).json({ success: false, error: 'Auction not found' });
        }

        if (amount <= listing.auction.currentHighestBid) {
            return res.status(400).json({ success: false, error: 'Bid must be higher than current highest bid' });
        }

        listing.auction.currentHighestBid = amount;
        // listing.auction.bids.push({ investorId: req.user._id, amount, timestamp: new Date() }); // Need typed User in req
        // For simplicity:
        listing.auction.bids.push({ investorId: 'current_user', amount, timestamp: new Date() });

        await listing.save();
        res.json({ success: true, data: listing });

    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
