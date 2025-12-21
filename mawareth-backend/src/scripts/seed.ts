
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Estate from '../models/Estate';
import MarketplaceListing from '../models/MarketplaceListing';

import BuyoutApplication from '../models/BuyoutApplication';
import bcrypt from 'bcryptjs';

dotenv.config();

// Deterministic ID Map for Demo Consistency
const ID_MAP: { [key: string]: string } = {
    // Users
    'user_admin': '5f8d04f14b87e527d42d0000',
    'user_heir': '5f8d04f14b87e527d42d0001', // Ahmed
    'user_investor': '5f8d04f14b87e527d42d0002', // Youssef

    // Estates
    'estate_voting': '5f8d04f14b87e527d42d0100', // Villa Al-Yasmine (The one for the Link)
    'estate_listed_1': '5f8d04f14b87e527d42d0101', // Maadi Apt
    'estate_listed_2': '5f8d04f14b87e527d42d0102', // Land

    // Other users to fill lists
    'user_002': '5f8d04f14b87e527d42d0010',
    'user_003': '5f8d04f14b87e527d42d0011',
    'user_004': '5f8d04f14b87e527d42d0012',
    'user_005': '5f8d04f14b87e527d42d0013',
};

// Helper to get or generate ID
const getId = (key: string) => {
    if (ID_MAP[key]) return ID_MAP[key];
    // Fallback: Generate a consistent-ish ID based on the key if needed, or just random
    // For this demo, we'll just use random for unimportant ones, but let's log it.
    // console.log(`Warning: Generating random ID for ${key}`);
    return new mongoose.Types.ObjectId().toString();
};

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mawareth');
        console.log('MongoDB Connected');

        // Clear existing data
        await User.deleteMany({});
        await Estate.deleteMany({});
        await MarketplaceListing.deleteMany({});
        await BuyoutApplication.deleteMany({});
        console.log('Cleared existing data');


        // Create Users (Mocking a large user base)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const usersData = [
            { _id: getId('user_admin'), name: 'Super Admin', role: 'super_admin', phone: '+20 100 000 0000', email: 'admin@mawareth.com', passwordHash: hashedPassword, isVerified: true },
            { _id: getId('user_heir'), name: 'Ahmed Mohamed', role: 'heir', phone: '+20 100 123 4567', email: 'ahmed@example.com', passwordHash: hashedPassword, isVerified: true },
            { _id: getId('user_investor'), name: 'Youssef Ibrahim', role: 'investor', phone: '+20 102 345 6789', email: 'youssef@example.com', passwordHash: hashedPassword, isVerified: true },

            // Dummy Users for Heirs & Admin Dashboard Scenarios
            { _id: getId('user_002'), name: 'Fatima Hassan', role: 'heir', phone: '01011112222', email: 'fatima@test.com', passwordHash: hashedPassword, isVerified: true },
            { _id: getId('user_003'), name: 'Omar Mohamed', role: 'heir', phone: '01033334444', email: 'omar@test.com', passwordHash: hashedPassword, isVerified: true },
            { _id: getId('user_004'), name: 'Layla Ahmed', role: 'heir', phone: '01055556666', email: 'layla@test.com', passwordHash: hashedPassword, isVerified: true },
            { _id: getId('user_005'), name: 'Khaled Said', role: 'heir', phone: '01077778888', email: 'khaled@test.com', passwordHash: hashedPassword, isVerified: true },
            { _id: getId('user_006'), name: 'Mona Zaki', role: 'moderator', phone: '01099990000', email: 'mona@admin.com', passwordHash: hashedPassword, isVerified: true },

            // More fillers for Admin Table
            ...Array.from({ length: 12 }).map((_, i) => ({
                _id: new mongoose.Types.ObjectId().toString(),
                name: `User ${i + 7}`,
                role: 'heir',
                phone: `010${10000000 + i}`,
                email: `user${i + 7}@test.com`,
                passwordHash: hashedPassword,
                isVerified: Math.random() > 0.5
            }))
        ];

        await User.insertMany(usersData);
        console.log('Users seeded');

        // Create Estates (Rich variety for Dashboard & Marketplace)
        const estatesData = [
            // 1. VOTING DEMO (For the Link)
            {
                _id: getId('estate_voting'),
                title: 'Villa Al-Yasmine',
                address: '15 Tahrir St.',
                city: 'Cairo',
                area: 500,
                propertyType: 'villa',
                marketValuation: 5000000,
                solhAskPrice: 4800000,
                status: 'voting',
                badge: 'cash-deal',
                timeLeftDays: 14,
                instantProfit: 200000,
                description: 'A luxurious villa in the heart of Cairo, perfect for a family home or investment.',
                details: '5 Bedrooms, 4 Bathrooms, Large Garden, Swimming Pool.',
                images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop'],
                heirs: [
                    { userId: getId('user_heir'), userName: 'Ahmed Mohamed', relation: 'Son', sharePercentage: 50, shareValue: 2500000, vote: 'sell', nationalId: '29001011234567' },
                    { userId: getId('user_002'), userName: 'Fatima Hassan', relation: 'Daughter', sharePercentage: 50, shareValue: 2500000, vote: 'pending', nationalId: '29202021234567' }
                ],
                deceasedName: 'Late Dr. Mohamed',
            },
            // 2. Dashboard: Disputed Estate
            {
                _id: new mongoose.Types.ObjectId().toString(),
                title: 'Family Building in Giza',
                address: '8 Haram St',
                city: 'Giza',
                area: 800,
                propertyType: 'building',
                marketValuation: 12000000,
                solhAskPrice: 10000000,
                status: 'disputed',
                images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop'],
                heirs: [
                    { userId: getId('user_heir'), userName: 'Ahmed Mohamed', relation: 'Son', sharePercentage: 20, shareValue: 2400000, vote: 'pending', nationalId: '29001011234567' },
                    { userId: getId('user_004'), userName: 'Layla Ahmed', relation: 'Daughter', sharePercentage: 20, shareValue: 2400000, vote: 'disagree', nationalId: '29101011234567' }
                ],
                deceasedName: 'Hajj Ahmed',
            },
            // 3. Marketplace: Luxury Apartment (Listed)
            {
                _id: getId('estate_listed_1'),
                title: 'Luxury Apartment in Maadi',
                address: '10 Road 9',
                city: 'Maadi',
                area: 180,
                propertyType: 'apartment',
                marketValuation: 3000000,
                solhAskPrice: 2600000,
                status: 'listed',
                badge: 'cash-deal',
                timeLeftDays: 10,
                instantProfit: 400000,
                images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2500'],
                heirs: [
                    { userId: getId('user_heir'), userName: 'Ahmed Mohamed', relation: 'Son', sharePercentage: 50, shareValue: 1500000, vote: 'sell', nationalId: '29001011234567' },
                    { userId: getId('user_002'), userName: 'Fatima Hassan', relation: 'Daughter', sharePercentage: 50, shareValue: 1500000, vote: 'sell', nationalId: '29202021234567' }
                ],
                consensus: { accepted: 2, total: 2 }
            },
            // 4. Marketplace: Land (Listed)
            {
                _id: getId('estate_listed_2'),
                title: 'Agricultural Land',
                address: 'Cairo-Alex Desert Road',
                city: 'Giza',
                area: 1000,
                propertyType: 'land',
                marketValuation: 10000000,
                solhAskPrice: 8500000,
                status: 'listed',
                badge: 'buyout-opportunity',
                timeLeftDays: 30,
                instantProfit: 1500000,
                images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832'],
                heirs: [],
                consensus: { accepted: 3, total: 3 }
            },
            // 5. Marketplace: Commercial (Listed)
            {
                _id: new mongoose.Types.ObjectId().toString(),
                title: 'Office in 5th Settlement',
                address: '90th Street',
                city: 'New Cairo',
                area: 120,
                propertyType: 'commercial',
                marketValuation: 6000000,
                solhAskPrice: 5200000,
                status: 'listed',
                badge: 'check-mark',
                timeLeftDays: 5,
                instantProfit: 800000,
                images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301'],
                heirs: [],
                consensus: { accepted: 4, total: 4 }
            },
            // 6. Marketplace: Chalet (Listed)
            {
                _id: new mongoose.Types.ObjectId().toString(),
                title: 'Sea View Chalet',
                address: 'Marassi',
                city: 'North Coast',
                area: 110,
                propertyType: 'chalet',
                marketValuation: 8500000,
                solhAskPrice: 7500000,
                status: 'listed',
                badge: 'sea-view',
                timeLeftDays: 45,
                instantProfit: 1000000,
                images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2000'],
                heirs: [],
                consensus: { accepted: 2, total: 2 }
            },
            // 7. Pending Listing (For Admin Demo)
            {
                _id: new mongoose.Types.ObjectId().toString(),
                title: 'Unverified Land in Sinai',
                address: 'Ras Sudr',
                city: 'South Sinai',
                area: 5000,
                propertyType: 'land',
                marketValuation: 2000000,
                solhAskPrice: 1500000,
                status: 'listed',
                badge: 'opportunity',
                images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832'],
                heirs: [],
                consensus: { accepted: 2, total: 2 }
            }
        ];

        await Estate.insertMany(estatesData);
        console.log('Estates seeded');

        // Marketplace Listings
        const listingsData = estatesData
            .filter(e => e.status === 'listed')
            .map((e, index) => {
                // Make the last one (Sinai) pending
                const isPending = e.title.includes('Sinai');

                return {
                    estateId: e._id,
                    title: e.title,
                    // ... (fields match schema)
                    marketValuation: e.marketValuation,
                    startingBid: Math.round(e.solhAskPrice * 0.8),
                    // Schema: pending_review or active
                    status: isPending ? 'pending_review' : 'active',
                    auctionEndTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
                };
            });

        await MarketplaceListing.insertMany(listingsData);
        console.log('Marketplace Listings seeded');

        console.log('Data Seeding Completed Successfully');
        console.log('-----------------------------------');
        console.log('Admin Login: admin@mawareth.com / password123');
        console.log('Heir Login: ahmed@example.com / password123');
        console.log(`Voting Demo URL: http://localhost:5173/vote/${getId('estate_voting')}`);
        console.log('-----------------------------------');

        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
