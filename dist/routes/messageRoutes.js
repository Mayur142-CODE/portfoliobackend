"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Message_1 = __importDefault(require("../models/Message"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const newMessage = await Message_1.default.create({ name, email, subject, message });
        res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/', auth_1.protect, auth_1.adminOnly, async (_req, res) => {
    try {
        const messages = await Message_1.default.find().sort({ createdAt: -1 }).lean();
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id', auth_1.protect, auth_1.adminOnly, async (req, res) => {
    try {
        const message = await Message_1.default.findByIdAndDelete(req.params.id);
        if (!message) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }
        res.json({ message: 'Message deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
