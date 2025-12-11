"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const estateRoutes_1 = __importDefault(require("./routes/estateRoutes"));
const marketplaceRoutes_1 = __importDefault(require("./routes/marketplaceRoutes"));
const buyoutRoutes_1 = __importDefault(require("./routes/buyoutRoutes"));
const renovationRoutes_1 = __importDefault(require("./routes/renovationRoutes"));
// Load env vars
dotenv_1.default.config();
// Connect to database
(0, db_1.default)();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/estates', estateRoutes_1.default);
app.use('/api/marketplace', marketplaceRoutes_1.default);
app.use('/api/buyouts', buyoutRoutes_1.default);
app.use('/api/renovations', renovationRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Mawareth API is running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
