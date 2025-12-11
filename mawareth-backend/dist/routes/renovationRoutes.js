"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const renovationController_1 = require("../controllers/renovationController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/estate/:estateId', authMiddleware_1.protect, renovationController_1.getRenameOfferByEstateId);
router.post('/apply', authMiddleware_1.protect, renovationController_1.applyRenovation);
exports.default = router;
