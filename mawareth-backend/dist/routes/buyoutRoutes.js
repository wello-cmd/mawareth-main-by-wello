"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const buyoutController_1 = require("../controllers/buyoutController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, buyoutController_1.createApplication);
router.get('/my', authMiddleware_1.protect, buyoutController_1.getMyApplications);
router.get('/:id', authMiddleware_1.protect, buyoutController_1.getApplicationById);
router.patch('/:id/status', authMiddleware_1.protect, buyoutController_1.updateStatus);
exports.default = router;
