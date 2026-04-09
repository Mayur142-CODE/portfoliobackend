import { Router, Request, Response } from 'express';
import Message from '../models/Message';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const newMessage = await Message.create({ name, email, subject, message });
        res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', protect, adminOnly, async (_req: Request, res: Response): Promise<void> => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }).lean();
        res.json(messages);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', protect, adminOnly, async (req: Request, res: Response): Promise<void> => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }
        res.json({ message: 'Message deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
