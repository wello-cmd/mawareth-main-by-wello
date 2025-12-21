import mongoose, { Document, Schema } from 'mongoose'; // Import Mongoose types

// Interface for Marketplace Listing document
export interface IMarketplaceListing extends Document {
    estateId: mongoose.Types.ObjectId;
    marketValuation: number;
    startingBid: number;
    currentHighestBid: number;
    highestBidderId?: mongoose.Types.ObjectId;
    bidHistory?: {
        bidderId: mongoose.Types.ObjectId;
        amount: number;
        timestamp: Date;
    }[];
    status: 'pending_review' | 'active' | 'sold' | 'rejected';
    approvedBy?: mongoose.Types.ObjectId;
    auctionEndTime: Date;
}

// Define Marketplace Listing Schema
const MarketplaceListingSchema: Schema = new Schema({
    estateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Estate' }, // Reference to the Estate being sold

    // Auction Pricing Logic
    marketValuation: { type: Number, required: true }, // Estimated market value
    startingBid: { type: Number, required: true }, // Minimum starting bid (usually max 80% of valuation)
    currentHighestBid: { type: Number, default: 0 }, // Current top bid amount
    highestBidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User ID of current top bidder

    // Bid History Log
    bidHistory: [{
        bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who placed bid
        amount: Number, // Bid amount
        timestamp: { type: Date, default: Date.now } // Time of bid
    }],

    // Moderation Logic
    status: { // Listing status
        type: String,
        enum: ['pending_review', 'active', 'sold', 'rejected'],
        default: 'pending_review'
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin/Moderator who approved listing

    auctionEndTime: { type: Date, required: true } // When the auction closes
});

export default mongoose.model<IMarketplaceListing>('MarketplaceListing', MarketplaceListingSchema); // Export MarketplaceListing model
