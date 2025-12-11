
import mongoose, { Document, Schema } from 'mongoose';

export interface IMarketplaceListing extends Document {
    estateId: string; // Reference to Estate
    title: string;
    address: string;
    city: string;
    area: number;
    propertyType: string;
    marketValuation: number;
    askPrice: number;
    instantProfit: number;
    profitPercentage: number;
    badge: string;
    timeLeftDays: number;
    images: string[];
    isLocked: boolean;
    depositRequired: number;
    hasAuction?: boolean;
    auction?: {
        currentHighestBid: number;
        minimumBidIncrement: number;
        endsAt: Date;
        status: 'active' | 'ended';
        bids: Array<{
            investorId: string;
            amount: number;
            timestamp: Date;
        }>
    };
}

const MarketplaceListingSchema: Schema = new Schema({
    estateId: { type: Schema.Types.ObjectId, ref: 'Estate', required: true },
    title: String,
    address: String,
    city: String,
    area: Number,
    propertyType: String,
    marketValuation: Number,
    askPrice: Number,
    instantProfit: Number,
    profitPercentage: Number,
    badge: String,
    timeLeftDays: Number,
    images: [String],
    isLocked: { type: Boolean, default: true },
    depositRequired: Number,
    hasAuction: Boolean,
    auction: {
        currentHighestBid: Number,
        minimumBidIncrement: Number,
        endsAt: Date,
        status: { type: String, enum: ['active', 'ended'] },
        bids: [{
            investorId: String,
            amount: Number,
            timestamp: Date
        }]
    }
}, {
    timestamps: true,
});

export default mongoose.model<IMarketplaceListing>('MarketplaceListing', MarketplaceListingSchema);
