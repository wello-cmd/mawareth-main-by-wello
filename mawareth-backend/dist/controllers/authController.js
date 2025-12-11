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
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone, role } = req.body;
    try {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const user = yield User_1.default.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'heir',
        });
        if (user) {
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                session: {
                    token: generateToken(user._id.toString()),
                }
            });
        }
        else {
            res.status(400).json({ error: 'Invalid user data' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                session: {
                    token: generateToken(user._id.toString()),
                }
            });
        }
        else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        res.json(req.user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});
exports.getMe = getMe;
