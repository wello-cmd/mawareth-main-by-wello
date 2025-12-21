import mongoose, { Document, Schema } from 'mongoose'; // Import Mongoose types

// Interface for Buyout Application document
export interface IBuyoutApplication extends Document {
    applicantId: mongoose.Types.ObjectId;
    estateId: mongoose.Types.ObjectId;
    sharePercentage: number;
    requestedAmount: number;
    status: 'Pending' | 'Approved' | 'Rejected';
}

// Define Buyout Application Schema
const BuyoutApplicationSchema: Schema = new Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User applying for buyout
    estateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Estate' }, // Estate being applied against
    sharePercentage: { type: Number }, // Percentage of share to buyout
    requestedAmount: { type: Number }, // Amount requested for buyout
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'] } // Application status
});

export default mongoose.model<IBuyoutApplication>('BuyoutApplication', BuyoutApplicationSchema); // Export BuyoutApplication model
