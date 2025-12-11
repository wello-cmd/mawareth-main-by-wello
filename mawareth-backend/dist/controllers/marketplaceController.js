"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeBid = exports.unlockListing = exports.getListingById = exports.getListings = void 0;
const MarketplaceListing_1 = __importDefault(require("../models/MarketplaceListing"));
const getListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listings = yield MarketplaceListing_1.default.find({});
        res.json({ success: true, data: listings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getListings = getListings;
const getListingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield MarketplaceListing_1.default.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }
        res.json({ success: true, data: listing });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getListingById = getListingById;
const unlockListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield MarketplaceListing_1.default.findById(req.params.listingId);
        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }
        // In a real app we would check payment confirmation here
        listing.isLocked = false;
        yield listing.save();
        res.json({ success: true, data: listing });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.unlockListing = unlockListing;
const placeBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const listing = yield MarketplaceListing_1.default.findById(req.params.listingId);
        if (!listing || !listing.auction) {
            return res.status(404).json({ success: false, error: 'Auction not found' });
        }
        if (amount <= listing.auction.currentHighestBid) {
            return res.status(400).json({ success: false, error: 'Bid must be higher than current highest bid' });
        }
        listing.auction.currentHighestBid = amount;
        // listing.auction.bids.push({ investorId: req.user._id, amount, timestamp: new Date() }); // Need typed User in req
        // For simplicity:
        listing.auction.bids.push({ investorId: 'current_user', amount, timestamp: new Date() });
        yield listing.save();
        res.json({ success: true, data: listing });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.placeBid = placeBid;
