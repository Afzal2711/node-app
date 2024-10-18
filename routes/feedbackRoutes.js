import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Create feedback
router.post('/feedback', async (req, res) => {
    
    const { message, createdAt } = req.body;

    try {
        const newFeedback = new Feedback({ message, createdAt });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback saved successfully', newFeedback });
    } catch (error) {
        console.error('error submitting feedback:',error)
        res.status(400).send('error submitting feedback: '+error.message);
    }
});

// Get all feedback
router.get('/feedback', async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedback', error });
    }
});

export default router;
