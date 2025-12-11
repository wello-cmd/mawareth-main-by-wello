"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estateController_1 = require("../controllers/estateController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, estateController_1.getEstates);
router.post('/', authMiddleware_1.protect, estateController_1.createEstate);
router.get('/:id', authMiddleware_1.protect, estateController_1.getEstateById);
router.get('/status/:status', authMiddleware_1.protect, estateController_1.getEstates); // Logic handled in getEstates via query or separate if needed, strictly speaking RESTful usually query param
router.patch('/:estateId/vote', authMiddleware_1.protect, estateController_1.updateVote);
router.patch('/:estateId/consensus', authMiddleware_1.protect, estateController_1.updateConsensus);
exports.default = router;
