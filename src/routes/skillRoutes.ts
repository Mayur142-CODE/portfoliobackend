import { Router, Request, Response } from 'express';
import Skill from '../models/Skill';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
    try {
        const skills = await Skill.find().sort({ level: -1 }).lean();
        res.json(skills);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', protect, adminOnly, async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, level } = req.body;
        const existing = await Skill.findOne({ name }).lean();
        if (existing) {
            res.status(400).json({ message: 'Skill already exists' });
            return;
        }
        const skill = await Skill.create({ name, level });
        res.status(201).json(skill);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', protect, adminOnly, async (req: Request, res: Response): Promise<void> => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            res.status(404).json({ message: 'Skill not found' });
            return;
        }
        res.json({ message: 'Skill deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
