import { Request, Response } from 'express'; // Import Express types
import MarketplaceListing from '../models/MarketplaceListing'; // Import MarketplaceListing model
import Estate from '../models/Estate'; // Import Estate model

// Create a new Listing (Admin/Moderator Only typically, or triggered by system)
export const createListing = async (req: Request, res: Response) => {
    try {
        const { estateId, marketValuation, startingBid, auctionEndTime } = req.body; // Destructure listing details

        // 1. Verify Estate Exists & Consensus Reached
        const estate = await Estate.findById(estateId); // Find estate by ID
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' }); // Return 404 if not found
        }

        if (estate.status !== 'voting' && estate.status !== 'listed' && estate.status !== 'Consensus_Reached') { // Check if estate is ready for listing (voting implies ready/in-progress)
            return res.status(400).json({
                success: false,
                error: 'Cannot list estate. Consensus has not been reached yet.'
            });
        }

        // 30% Rule: Starting Bid Validation
        // Must be at least 30% lower than market valuation (i.e., max 70% of value)
        const maxStartingBid = Number(marketValuation) * 0.7;
        if (Number(startingBid) > maxStartingBid) {
            return res.status(400).json({
                success: false,
                error: `Starting bid (${startingBid}) is too high. It must be at most 70% of Market Valuation (${marketValuation}). Max allowed: ${maxStartingBid}`
            });
        }

        // 2. Create Listing
        const listing = await MarketplaceListing.create({ // Create new listing in DB
            estateId,
            marketValuation,
            startingBid,
            currentHighestBid: 0,
            status: 'active', // or pending_review if moderation enabled
            auctionEndTime: new Date(auctionEndTime),
            approvedBy: (req as any).user._id // Set approver ID
        });

        // 3. Update Estate Status
        estate.status = 'listed'; // Mark estate as listed
        await estate.save(); // Save estate changes

        res.status(201).json({ success: true, data: listing }); // Return created listing

    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Get all listings
export const getListings = async (req: Request, res: Response) => {
    try {
        const listings = await MarketplaceListing.find({}).populate('estateId'); // Find all listings and populate estate details
        res.json({ success: true, data: listings }); // Return listings
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Get a single listing by ID
export const getListingById = async (req: Request, res: Response) => {
    try {
        const listing = await MarketplaceListing.findById(req.params.id); // Find listing by ID
        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' }); // Return 404 if not found
        }
        res.json({ success: true, data: listing }); // Return listing data
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// unlockListing removed as isLocked is removed from schema
// Or replaced with a status update? Keeping empty/deprecated for now to avoid breaking routes if any.
export const unlockListing = async (req: Request, res: Response) => {
    return res.status(501).json({ success: false, error: 'Not implemented in new schema' }); // Return Not Implemented
};

// placeBid Restored for Auction Logic
export const placeBid = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body; // Get bid amount
        const listing = await MarketplaceListing.findById(req.params.listingId); // Find listing

        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' }); // Return 404 if not found
        }

        // 1. Check if Auction is Active
        if (new Date() > listing.auctionEndTime) { // Check if auction time has passed
            return res.status(400).json({ success: false, error: 'Auction has ended' }); // Return error if ended
        }

        // 2. Validate Bid Amount
        if (amount <= listing.currentHighestBid || amount <= listing.startingBid) { // Check if bid is high enough
            return res.status(400).json({ success: false, error: 'Bid must be higher than current highest bid and starting bid' });
        }

        // 3. Update Auction State
        listing.currentHighestBid = amount; // Update highest bid
        listing.highestBidderId = (req as any).user._id; // Set highest bidder

        // 4. Push to History
        if (!listing.bidHistory) listing.bidHistory = []; // Initialize history if missing
        listing.bidHistory.push({ // Add bid to history
            bidderId: (req as any).user._id,
            amount: amount,
            timestamp: new Date()
        });

        // 5. Sniper Protection: Extend by 5 minutes if bid is within last 5 minutes
        const minutesRemaining = (listing.auctionEndTime.getTime() - new Date().getTime()) / 60000; // Calculate minutes left
        if (minutesRemaining < 5) { // If less than 5 minutes
            listing.auctionEndTime = new Date(listing.auctionEndTime.getTime() + 5 * 60000); // Extend by 5 minutes
        }

        await listing.save(); // Save listing changes
        res.json({ success: true, data: listing }); // Return updated listing

    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message }); // Return server error
    }
};

// Update Listing (e.g. Approve/Reject/Status Change)
export const updateListing = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const listing = await MarketplaceListing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }

        if (status) listing.status = status;

        // If approving, set approver
        if (status === 'active' || status === 'approved') {
            if (status === 'approved') listing.status = 'active';
            listing.approvedBy = (req as any).user._id;
        }

        await listing.save();
        res.json({ success: true, data: listing });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
