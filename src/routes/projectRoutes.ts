import { Router, Request, Response } from 'express';
import Project from '../models/Project';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }).lean();
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', protect, adminOnly, async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', protect, adminOnly, async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.json(project);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', protect, adminOnly, async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
