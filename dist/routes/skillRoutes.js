"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Skill_1 = __importDefault(require("../models/Skill"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const skills = await Skill_1.default.find().sort({ level: -1 }).lean();
        res.json(skills);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/', auth_1.protect, auth_1.adminOnly, async (req, res) => {
    try {
        const { name, level } = req.body;
        const existing = await Skill_1.default.findOne({ name }).lean();
        if (existing) {
            res.status(400).json({ message: 'Skill already exists' });
            return;
        }
        const skill = await Skill_1.default.create({ name, level });
        res.status(201).json(skill);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id', auth_1.protect, auth_1.adminOnly, async (req, res) => {
    try {
        const skill = await Skill_1.default.findByIdAndDelete(req.params.id);
        if (!skill) {
            res.status(404).json({ message: 'Skill not found' });
            return;
        }
        res.json({ message: 'Skill deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
