
import mongoose, { Document, Schema } from 'mongoose';

export type UserRole = 'heir' | 'investor' | 'admin';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    phone: string;
    role: UserRole;
    nationalId?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['heir', 'investor', 'admin'], default: 'heir' },
    nationalId: { type: String },
    isVerified: { type: Boolean, default: false },
}, {
    timestamps: true,
});

export default mongoose.model<IUser>('User', UserSchema);
