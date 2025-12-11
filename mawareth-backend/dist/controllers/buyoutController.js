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
exports.updateStatus = exports.getApplicationById = exports.getMyApplications = exports.createApplication = void 0;
const BuyoutApplication_1 = __importDefault(require("../models/BuyoutApplication"));
const createApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const application = yield BuyoutApplication_1.default.create(Object.assign(Object.assign({}, req.body), { userId: req.user._id // Assuming auth middleware attaches user
         }));
        res.status(201).json({ success: true, data: application });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.createApplication = createApplication;
const getMyApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield BuyoutApplication_1.default.find({ userId: req.user._id });
        res.json({ success: true, data: applications });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getMyApplications = getMyApplications;
const getApplicationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const application = yield BuyoutApplication_1.default.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }
        // Check ownership or admin
        if (application.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized' });
        }
        res.json({ success: true, data: application });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getApplicationById = getApplicationById;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Admin only typically
    try {
        const application = yield BuyoutApplication_1.default.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }
        application.status = req.body.status;
        yield application.save();
        res.json({ success: true, data: application });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateStatus = updateStatus;
