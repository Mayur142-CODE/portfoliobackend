"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const errorHandler_1 = require("./middleware/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express_1.default.json());
// API Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/skills', skillRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
// Health & Test checks
app.get('/api/test', (_req, res) => {
    res.json({ message: "API working" });
});
app.get('/api/health', (_req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});
// Error handling
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
// Start server
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log("Backend server started");
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
