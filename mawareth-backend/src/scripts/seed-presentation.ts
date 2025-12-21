// @ts-nocheck
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Estate from '../models/Estate';
import MarketplaceListing from '../models/MarketplaceListing';

dotenv.config();

const seed = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mawareth');
        console.log('Connected.');

        // Clear Data
        console.log('Clearing old data...');
        await User.deleteMany({});
        await Estate.deleteMany({});
        await MarketplaceListing.deleteMany({});

        // 1. Create Users
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('password123', salt);

        const admin = await User.create({
            name: 'Mohammed Waleed',
            email: 'admin@mawareth.eg',
            passwordHash: hash,
            role: 'super_admin',
            isVerified: true, // Bypass approval for seed
            phone: '01000000000'
        });

        const investor = await User.create({
            name: 'Saudi Investment Group',
            email: 'investor@shark-capital.sa',
            passwordHash: hash,
            role: 'investor',
            isVerified: true,
            phone: '01200000000'
        });

        const heir1 = await User.create({ name: 'Ahmed Ali', email: 'ahmed@family.com', passwordHash: hash, role: 'heir', isVerified: true, phone: '01111111111' });
        const heir2 = await User.create({ name: 'Sara Ali', email: 'sara@family.com', passwordHash: hash, role: 'heir', isVerified: true, phone: '01111111112' });
        const heir3 = await User.create({ name: 'Omar Ali', email: 'omar@family.com', passwordHash: hash, role: 'heir', isVerified: true, phone: '01111111113' });

        console.log('Users created.');

        // 2. Create Estates

        // Estate 1: Ready for Listing (Consensus Reached) -> Will be Listed in step 3
        const estate1 = await Estate.create({
            deceasedName: 'Ali Mahmoud Estate',
            assets: [
                { title: 'Luxury Villa in Zamalek', marketValue: 15000000, type: 'Real Estate' }
            ],
            heirs: [
                { userId: heir1._id, nationalId: '29001011234567', share: 0.4, voteStatus: 'agree' },
                { userId: heir2._id, nationalId: '29205051234567', share: 0.3, voteStatus: 'agree' },
                { userId: heir3._id, nationalId: '29509091234567', share: 0.3, voteStatus: 'agree' }
            ],
            status: 'Listed', // Pre-set to listed for the marketplace item
            votingToken: 'villa-token-123'
        });

        // Estate 2: Pending Voting (Mock for checking VotePage)
        const estate2 = await Estate.create({
            deceasedName: 'Hassan Family Building',
            assets: [
                { title: 'Apartment Building in Maadi', marketValue: 8000000, type: 'Real Estate' }
            ],
            heirs: [
                { userId: heir1._id, nationalId: '29001011234567', share: 0.5, voteStatus: 'pending' },
                { userId: heir2._id, nationalId: '29205051234567', share: 0.5, voteStatus: 'pending' }
            ],
            status: 'Pending',
            votingToken: 'maadi-token-456'
        });

        // Estate 3: Disputed / Downtown
        const estate3 = await Estate.create({
            deceasedName: 'Grandfather Downtown Office',
            assets: [
                { title: 'Historic Office - Downtown', marketValue: 4500000, type: 'Real Estate' }
            ],
            heirs: [
                { userId: heir1._id, nationalId: '29001011234567', share: 0.2, voteStatus: 'agree' },
                { userId: heir2._id, nationalId: '29205051234567', share: 0.4, voteStatus: 'disagree' }, // Conflict
                { userId: heir3._id, nationalId: '29509091234567', share: 0.4, voteStatus: 'pending' }
            ],
            status: 'Pending',
            votingToken: 'downtown-token-789'
        });

        console.log('Estates created.');

        // 3. Create Marketplace Listing
        // Linking to Estate 1 (Villa)
        const listing1 = await MarketplaceListing.create({
            estateId: estate1._id,
            marketValuation: 15000000,
            startingBid: 12000000, // 20% discount start
            currentHighestBid: 12500000,
            highestBidderId: investor._id,
            bidHistory: [
                { bidderId: investor._id, amount: 12500000, timestamp: new Date() }
            ],
            status: 'active',
            auctionEndTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Ends in 7 days
            approvedBy: admin._id,
            // Injecting images manually since schema defines structure but not direct image array in listing usually,
            // wait, frontend uses estate.images mostly. Let's ensure estate has images or extend schema if needed. 
            // Looking at Frontend Card: `estate.images[0]`.
            // Models/Estate.ts shows `assets` but not explicit `images` array in backend schema!
            // Wait, I updated Estate schema recently to remove `images`? 
            // Let me check Estate.ts.
            // If missing, I need to add it because frontend depends on it.
        });

        // Quick Schema Fix check:
        // Frontend VotePage.tsx: `estate.images[0]`
        // Backend Estate.ts: I see `assets`, but I might have missed `images`. 
        // I'll add `images` to the Estate documents in this seed (Mongoose is flexible).

        await Estate.updateOne({ _id: estate1._id }, { $set: { images: ['/images/villa.png'] } });
        await Estate.updateOne({ _id: estate2._id }, { $set: { images: ['/images/modern_apt.png'] } });
        await Estate.updateOne({ _id: estate3._id }, { $set: { images: ['/images/downtown.png'] } });

        console.log('Marketplace Listing created.');
        console.log('-----------------------------------');
        console.log('SEED COMPLETE');
        console.log('Admin Login: admin@mawareth.eg / password123');
        console.log('Investor Login: investor@shark-capital.sa / password123');
        console.log('Voting Link (Maadi): http://localhost:5173/vote/' + estate2._id);
        console.log('-----------------------------------');

        process.exit(0);
    } catch (error) {
        console.error('Seed Error:', error);
        process.exit(1);
    }
};

seed();
