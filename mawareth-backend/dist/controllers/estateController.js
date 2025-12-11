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
exports.updateConsensus = exports.updateVote = exports.createEstate = exports.getEstateById = exports.getEstates = void 0;
const Estate_1 = __importDefault(require("../models/Estate"));
const getEstates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.query.status;
        const filter = status ? { status } : {};
        const estates = yield Estate_1.default.find(filter);
        res.json({ success: true, data: estates });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getEstates = getEstates;
const getEstateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estate = yield Estate_1.default.findById(req.params.id);
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' });
        }
        res.json({ success: true, data: estate });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getEstateById = getEstateById;
const createEstate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estate = yield Estate_1.default.create(req.body);
        res.status(201).json({ success: true, data: estate });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.createEstate = createEstate;
const updateVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estateId } = req.params;
    const { heirId, vote } = req.body;
    try {
        const estate = yield Estate_1.default.findById(estateId);
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' });
        }
        const heir = estate.heirs.find((h) => h._id.toString() === heirId || h.userId === heirId);
        if (heir) {
            heir.vote = vote;
            // Recalculate consensus driven by votes potentially, but for now just save
            yield estate.save();
            res.json({ success: true, data: estate });
        }
        else {
            res.status(404).json({ success: false, error: 'Heir not found in estate' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateVote = updateVote;
const updateConsensus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estateId } = req.params;
    const { vote } = req.body;
    try {
        const estate = yield Estate_1.default.findById(estateId);
        if (!estate) {
            return res.status(404).json({ success: false, error: 'Estate not found' });
        }
        if (estate.consensus) {
            if (vote === 'accept') {
                estate.consensus.accepted += 1;
            }
            yield estate.save();
        }
        res.json({ success: true, data: estate });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateConsensus = updateConsensus;
