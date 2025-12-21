import mongoose, { Document, Schema } from 'mongoose'; // Import Mongoose types

// Define allowed user roles
export type UserRole = 'heir' | 'investor' | 'admin' | 'super_admin' | 'moderator';

// Define User interface extending Mongoose Document
export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    role: UserRole;
    isVerified: boolean;
    adminNotes?: string;
    promotedBy?: mongoose.Types.ObjectId;
}

// Create User Schema
const UserSchema: Schema = new Schema({
    name: { type: String, required: true }, // User's full name
    email: { type: String, required: true, unique: true }, // User's email (unique)
    phone: { type: String, required: true }, // User's phone
    passwordHash: { type: String, required: true }, // Hashed password
    role: {
        type: String,
        enum: ['heir', 'investor', 'admin', 'super_admin', 'moderator'], // Allowed roles
        default: 'heir' // Default role
    },
    isVerified: { type: Boolean, default: false }, // Verification status
    adminNotes: { type: String }, // Internal notes by admins
    promotedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to user who promoted this user (if any)
});

export default mongoose.model<IUser>('User', UserSchema); // Export User model
