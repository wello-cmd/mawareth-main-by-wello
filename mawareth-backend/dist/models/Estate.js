"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const HeirSchema = new mongoose_1.Schema({
    userId: { type: String }, // keeping as string to match frontend logic or can be ObjectId
    userName: String,
    relation: String,
    sharePercentage: Number,
    shareValue: Number,
    vote: { type: String, enum: ['sell', 'keep', 'pending'], default: 'pending' }
});
const EstateSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: Number, required: true },
    propertyType: { type: String, required: true },
    marketValuation: { type: Number, required: true },
    solhAskPrice: { type: Number, required: true },
    status: { type: String, enum: ['disputed', 'voting', 'listed', 'sold'], default: 'voting' },
    heirs: [HeirSchema],
    images: [String],
    badge: { type: String, enum: ['cash-deal', 'buyout-opportunity'] },
    timeLeftDays: Number,
    instantProfit: Number,
    consensus: {
        accepted: { type: Number, default: 0 },
        total: { type: Number, default: 0 }
    }
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Estate', EstateSchema);
