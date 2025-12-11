
import mongoose, { Document, Schema } from 'mongoose';

export interface IBuyoutApplication extends Document {
    userId: string;
    estateId?: string;
    financingType: 'standard' | 'murabaha';
    shareValue: number;
    monthlyIncome: number;
    repaymentPeriodMonths: number;
    monthlyInstallment: number;
    dtiRatio: number;
    requiresLeasing: boolean;
    estimatedRent?: number;
    netPayment?: number;
    status: 'pending' | 'approved' | 'approved-with-leasing' | 'rejected';
}

const BuyoutApplicationSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    estateId: { type: Schema.Types.ObjectId, ref: 'Estate' },
    financingType: { type: String, required: true },
    shareValue: { type: Number, required: true },
    monthlyIncome: { type: Number, required: true },
    repaymentPeriodMonths: { type: Number, required: true },
    monthlyInstallment: Number,
    dtiRatio: Number,
    requiresLeasing: Boolean,
    estimatedRent: Number,
    netPayment: Number,
    status: { type: String, enum: ['pending', 'approved', 'approved-with-leasing', 'rejected'], default: 'pending' },
}, {
    timestamps: true,
});

export default mongoose.model<IBuyoutApplication>('BuyoutApplication', BuyoutApplicationSchema);
