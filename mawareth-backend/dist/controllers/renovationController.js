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
exports.applyRenovation = exports.getRenameOfferByEstateId = void 0;
const RenovationOffer_1 = __importDefault(require("../models/RenovationOffer"));
const getRenameOfferByEstateId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = yield RenovationOffer_1.default.findOne({ estateId: req.params.estateId });
        // It's possible no offer exists
        res.json({ success: true, data: offer });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getRenameOfferByEstateId = getRenameOfferByEstateId;
const applyRenovation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Just a stub for now
    try {
        // meaningful logic would go here
        res.json({ success: true, message: 'Application received' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.applyRenovation = applyRenovation;
