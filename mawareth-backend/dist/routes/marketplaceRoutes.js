"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const marketplaceController_1 = require("../controllers/marketplaceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, marketplaceController_1.getListings);
router.get('/:id', authMiddleware_1.protect, marketplaceController_1.getListingById);
router.post('/:listingId/unlock', authMiddleware_1.protect, marketplaceController_1.unlockListing);
router.post('/:listingId/bid', authMiddleware_1.protect, marketplaceController_1.placeBid);
exports.default = router;
