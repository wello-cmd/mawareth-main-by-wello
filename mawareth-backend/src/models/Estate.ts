import mongoose, { Document, Schema } from 'mongoose'; // Import Mongoose types

// Interface for a single asset within an estate
export interface IAsset {
    title: string; // Asset name
    value: number; // Asset value
    type: string; // Asset type (e.g., real estate, cash)
}

// Interface for an heir in an estate
export interface IHeir {
    userId: mongoose.Types.ObjectId; // Link to User model
    phone: string; // Heir phone number
    nationalId: string; // Heir National ID
    share: number; // Inherited share percentage/amount
    voteStatus: 'pending' | 'agree' | 'disagree'; // Voting status
    vote?: 'pending' | 'agree' | 'disagree' | 'sell' | 'keep'; // Added to support new voting logic
}

// Interface for Estate document
export interface IEstate extends Document {
    deceasedName: string;
    assets: IAsset[];
    votingToken?: string;
    heirs: IHeir[];
    status: 'disputed' | 'voting' | 'listed' | 'sold' | 'Consensus_Reached'; // Updated to match schema
    consensus?: {
        accepted: number;
        total: number;
    };
}

// Define Estate Schema (Updated for Iteration 1 Frontend Requirements)
const EstateSchema: Schema = new Schema({
    // Core Fields
    title: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    propertyType: { type: String, required: true }, // villa, apartment, land, etc.
    area: { type: Number, required: true }, // in sqm/feddans

    // Financials
    marketValuation: { type: Number, required: true },
    solhAskPrice: { type: Number, required: true },
    instantProfit: { type: Number },

    // Meta / Display
    images: [{ type: String }],
    badge: { type: String }, // cash-deal, buyout-opportunity
    timeLeftDays: { type: Number },
    details: { type: String },
    description: { type: String },

    // Legacy/Internal
    deceasedName: { type: String, default: 'Unknown' },
    votingToken: { type: String, unique: true, sparse: true },

    heirs: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        userName: String, // De-normalized for display
        relation: String,
        phone: String,
        nationalId: { type: String, default: '00000000000000' }, // Default for legacy/seed
        sharePercentage: Number,
        shareValue: Number,
        vote: { type: String, enum: ['pending', 'agree', 'disagree', 'sell', 'keep'], default: 'pending' }
    }],

    consensus: {
        accepted: { type: Number, default: 0 },
        total: { type: Number, default: 0 }
    },

    // Status matching Frontend StatusLabels
    status: {
        type: String,
        enum: ['disputed', 'voting', 'listed', 'sold', 'Consensus_Reached'],
        default: 'voting'
    }
}, { timestamps: true });

export default mongoose.model<IEstate>('Estate', EstateSchema); // Export Estate model
