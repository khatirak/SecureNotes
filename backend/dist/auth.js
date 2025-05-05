"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authRouter = express_1.default.Router();
const JWT_SECRET = "your-secret-key"; // In a real app, use environment variables
// Hardcoded user
const user = {
    username: "intern",
    password: "letmein"
};
// Login route
exports.authRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    // Check credentials
    if (username === user.username && password === user.password) {
        // Generate token that expires in 15 minutes
        const token = jsonwebtoken_1.default.sign({ username }, JWT_SECRET, { expiresIn: "15m" });
        return res.json({ token });
    }
    return res.status(401).json({ message: "Invalid credentials" });
});
