"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./auth");
const notes_1 = require("./notes");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// CORS configuration - just use this one approach
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));
// JSON body parser middleware
app.use(express_1.default.json());
// Routes
app.use("/auth", auth_1.authRouter);
app.use("/notes", middleware_1.authMiddleware, notes_1.notesRouter);
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
