import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import skillRoutes from './routes/skillRoutes';
import messageRoutes from './routes/messageRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
      /\.vercel\.app$/
    ],
    credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/messages', messageRoutes);

// Health & Test checks
app.get('/api/test', (_req: Request, res: Response) => {
    res.json({ message: "API working" });
});

app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Server is healthy' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Backend server started");
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
