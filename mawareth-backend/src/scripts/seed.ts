
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Estate from '../models/Estate';
import MarketplaceListing from '../models/MarketplaceListing';

import BuyoutApplication from '../models/BuyoutApplication';
import bcrypt from 'bcryptjs';

dotenv.config();

// ID Mapping to keep relationships intact
const idMap: { [key: string]: string } = {};

const generateId = (oldId: string) => {
    if (!idMap[oldId]) {
        idMap[oldId] = new mongoose.Types.ObjectId().toString();
    }
    return idMap[oldId];
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

        // Create Users
        // Using simple password hash for all
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const usersData = [
            {
                _id: generateId('user_001'),
                name: 'Ahmed Mohamed',
                role: 'heir',
                phone: '+20 100 123 4567',
                email: 'ahmed@example.com',
                password: hashedPassword,
                isVerified: true
            },
            {
                _id: generateId('user_002'),
                name: 'Fatima Hassan',
                role: 'heir',
                phone: '+20 101 234 5678',
                email: 'fatima@example.com',
                password: hashedPassword,
                isVerified: true
            },
            {
                _id: generateId('user_003'),
                name: 'Youssef Ibrahim',
                role: 'investor',
                phone: '+20 102 345 6789',
                email: 'youssef@example.com',
                password: hashedPassword,
                isVerified: true
            },
            // Additional users referenced in heirs
            { _id: generateId('user_004'), name: 'Omar Mohamed', role: 'heir', phone: '000', email: 'omar@ex.com', password: hashedPassword },
            { _id: generateId('user_005'), name: 'Mariam Khalil', role: 'heir', phone: '000', email: 'mariam@ex.com', password: hashedPassword },
            { _id: generateId('user_006'), name: 'Hassan Khalil', role: 'heir', phone: '000', email: 'hassan@ex.com', password: hashedPassword },
            { _id: generateId('user_007'), name: 'Nour Khalil', role: 'heir', phone: '000', email: 'nour@ex.com', password: hashedPassword },
            { _id: generateId('user_008'), name: 'Laila Khalil', role: 'heir', phone: '000', email: 'laila@ex.com', password: hashedPassword },
            { _id: generateId('user_009'), name: 'Samir Abdel', role: 'heir', phone: '000', email: 'samir@ex.com', password: hashedPassword },
            { _id: generateId('user_010'), name: 'Hana Abdel', role: 'heir', phone: '000', email: 'hana@ex.com', password: hashedPassword },
            { _id: generateId('user_011'), name: 'Karim Fathy', role: 'heir', phone: '000', email: 'karim@ex.com', password: hashedPassword },
            { _id: generateId('user_012'), name: 'Dina Fathy', role: 'heir', phone: '000', email: 'dina@ex.com', password: hashedPassword },
            { _id: generateId('user_013'), name: 'Amira Fathy', role: 'heir', phone: '000', email: 'amira@ex.com', password: hashedPassword },
            { _id: generateId('user_014'), name: 'Tarek Fathy', role: 'heir', phone: '000', email: 'tarek@ex.com', password: hashedPassword },
        ];

        await User.insertMany(usersData);
        console.log('Users seeded');

        // Create Estates
        const estatesData = [
            {
                _id: generateId('estate_001'),
                title: '140m² Apartment in Maadi - Degla',
                address: '15 Street 9, Maadi Degla',
                city: 'Cairo',
                area: 140,
                propertyType: 'apartment',
                marketValuation: 5000000,
                solhAskPrice: 3500000,
                status: 'listed',
                badge: 'cash-deal',
                timeLeftDays: 12,
                instantProfit: 1500000,
                consensus: { accepted: 3, total: 4 },
                heirs: [
                    { userId: generateId('user_001'), userName: 'Ahmed Mohamed', relation: 'Son', sharePercentage: 40, shareValue: 2000000, vote: 'sell' },
                    { userId: generateId('user_002'), userName: 'Fatima Hassan', relation: 'Daughter', sharePercentage: 20, shareValue: 1000000, vote: 'sell' },
                    { userId: generateId('user_004'), userName: 'Omar Mohamed', relation: 'Son', sharePercentage: 40, shareValue: 2000000, vote: 'pending' },
                ],
                images: ['/placeholder.svg'],
            },
            {
                _id: generateId('estate_002'),
                title: '200m² Villa in New Cairo',
                address: '42 Central Axis, Fifth Settlement',
                city: 'New Cairo',
                area: 200,
                propertyType: 'villa',
                marketValuation: 8500000,
                solhAskPrice: 6800000,
                status: 'voting',
                badge: 'buyout-opportunity',
                timeLeftDays: 8,
                instantProfit: 1700000,
                consensus: { accepted: 2, total: 4 },
                heirs: [
                    { userId: generateId('user_005'), userName: 'Mariam Khalil', relation: 'Wife', sharePercentage: 12.5, shareValue: 1062500, vote: 'sell' },
                    { userId: generateId('user_006'), userName: 'Hassan Khalil', relation: 'Son', sharePercentage: 43.75, shareValue: 3718750, vote: 'keep' },
                    { userId: generateId('user_007'), userName: 'Nour Khalil', relation: 'Daughter', sharePercentage: 21.875, shareValue: 1859375, vote: 'sell' },
                    { userId: generateId('user_008'), userName: 'Laila Khalil', relation: 'Daughter', sharePercentage: 21.875, shareValue: 1859375, vote: 'pending' },
                ],
                images: ['/placeholder.svg'],
            },
            {
                _id: generateId('estate_003'),
                title: '85m² Apartment in Nasr City',
                address: '7 Abbas El-Akkad Street',
                city: 'Nasr City',
                area: 85,
                propertyType: 'apartment',
                marketValuation: 2200000,
                solhAskPrice: 1650000,
                status: 'listed',
                badge: 'cash-deal',
                timeLeftDays: 5,
                instantProfit: 550000,
                consensus: { accepted: 2, total: 2 },
                heirs: [
                    { userId: generateId('user_009'), userName: 'Samir Abdel', relation: 'Brother', sharePercentage: 50, shareValue: 1100000, vote: 'sell' },
                    { userId: generateId('user_010'), userName: 'Hana Abdel', relation: 'Sister', sharePercentage: 50, shareValue: 1100000, vote: 'sell' },
                ],
                images: ['/placeholder.svg'],
            },
            {
                _id: generateId('estate_004'),
                title: '300m² Commercial in Downtown',
                address: '25 Talaat Harb Street',
                city: 'Downtown Cairo',
                area: 300,
                propertyType: 'commercial',
                marketValuation: 15000000,
                solhAskPrice: 12000000,
                status: 'disputed',
                badge: 'buyout-opportunity',
                timeLeftDays: 20,
                instantProfit: 3000000,
                consensus: { accepted: 1, total: 4 },
                heirs: [
                    { userId: generateId('user_011'), userName: 'Karim Fathy', relation: 'Son', sharePercentage: 33.33, shareValue: 5000000, vote: 'pending' },
                    { userId: generateId('user_012'), userName: 'Dina Fathy', relation: 'Daughter', sharePercentage: 16.67, shareValue: 2500000, vote: 'pending' },
                    { userId: generateId('user_013'), userName: 'Amira Fathy', relation: 'Daughter', sharePercentage: 16.67, shareValue: 2500000, vote: 'sell' },
                    { userId: generateId('user_014'), userName: 'Tarek Fathy', relation: 'Son', sharePercentage: 33.33, shareValue: 5000000, vote: 'keep' },
                ],
                images: ['/placeholder.svg'],
            }
        ];

        await Estate.insertMany(estatesData);
        console.log('Estates seeded');

        // Marketplace Listings
        const listingsData = estatesData
            .filter(e => e.status === 'listed' || e.status === 'voting')
            .map(e => ({
                estateId: e._id,
                title: e.title,
                address: e.address,
                city: e.city,
                area: e.area,
                propertyType: e.propertyType,
                marketValuation: e.marketValuation,
                askPrice: e.solhAskPrice,
                instantProfit: e.instantProfit || 0,
                profitPercentage: Math.round(((e.marketValuation - e.solhAskPrice) / e.marketValuation) * 100),
                badge: e.badge || 'cash-deal',
                timeLeftDays: e.timeLeftDays || 10,
                images: e.images,
                isLocked: true,
                depositRequired: 50000,
                hasAuction: e._id === generateId('estate_001'),
            }));

        await MarketplaceListing.insertMany(listingsData);
        console.log('Marketplace Listings seeded');



        console.log('Date Seeding Completed Successfully');
        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
