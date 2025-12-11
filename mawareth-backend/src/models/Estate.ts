
import mongoose, { Document, Schema } from 'mongoose';

export type EstateStatus = 'disputed' | 'voting' | 'listed' | 'sold';
export type DealBadge = 'cash-deal' | 'buyout-opportunity';

export interface IEstate extends Document {
    title: string;
    address: string;
    city: string;
    area: number;
    propertyType: 'apartment' | 'villa' | 'land' | 'commercial';
    marketValuation: number;
    solhAskPrice: number;
    status: EstateStatus;
    heirs: any[]; // Using mixed type for embedded heir data for simplicity or define sub-schema
    images: string[];
    badge?: DealBadge;
    timeLeftDays?: number;
    instantProfit?: number;
    consensus?: {
        accepted: number;
        total: number;
    };
}

const HeirSchema = new Schema({
    userId: { type: String }, // keeping as string to match frontend logic or can be ObjectId
    userName: String,
    relation: String,
    sharePercentage: Number,
    shareValue: Number,
    vote: { type: String, enum: ['sell', 'keep', 'pending'], default: 'pending' }
});

const EstateSchema: Schema = new Schema({
    title: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: Number, required: true },
    propertyType: { type: String, required: true },
    marketValuation: { type: Number, required: true },
    solhAskPrice: { type: Number, required: true },
    status: { type: String, enum: ['disputed', 'voting', 'listed', 'sold'], default: 'voting' },
    heirs: [HeirSchema],
    images: [String],
    badge: { type: String, enum: ['cash-deal', 'buyout-opportunity'] },
    timeLeftDays: Number,
    instantProfit: Number,
    consensus: {
        accepted: { type: Number, default: 0 },
        total: { type: Number, default: 0 }
    }
}, {
    timestamps: true,
});

export default mongoose.model<IEstate>('Estate', EstateSchema);
