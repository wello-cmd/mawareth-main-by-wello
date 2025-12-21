import mongoose, { Document, Schema } from 'mongoose'; // Import Mongoose types

// Interface for Document document
export interface IDocument extends Document {
    userId: mongoose.Types.ObjectId;
    type: 'partition_agreement' | 'poa_draft' | 'heir_inventory';
    status: 'draft' | 'purchased';
    formData: Record<string, any>;
    price: number;
    isDisclaimerAccepted: boolean;
    generatedUrl?: string;
    createdAt: Date;
}

// Define Document Schema
const DocumentSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner of the document
    type: { // Type of legal document
        type: String,
        enum: ['partition_agreement', 'poa_draft', 'heir_inventory'],
        required: true
    },
    status: { type: String, enum: ['draft', 'purchased'], default: 'draft' }, // Payment/Creation status
    formData: { type: Object }, // Dynamic data for filling the document template
    price: { type: Number, default: 200 }, // Cost of the document
    isDisclaimerAccepted: { type: Boolean, required: true }, // Legal disclaimer acceptance
    generatedUrl: { type: String }, // URL to download the generated file
    createdAt: { type: Date, default: Date.now } // Creation timestamp
});

export default mongoose.model<IDocument>('Document', DocumentSchema); // Export Document model
