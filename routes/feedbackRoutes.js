import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Create feedback
router.post('/feedback', async (req, res) => {
    
    const { UserName, message, rating } = req.body;
    // const UserName = req.user ? req.user.displayName || req.user.email : 'Anonymous';

    if(rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    try {
        const newFeedback = new Feedback({ UserName, message, rating });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback saved successfully',
        newFeedback: {
            UserName: newFeedback.UserName,
            message: newFeedback.message,
            rating: newFeedback.rating,
            createdAt: newFeedback.createdAt
        }});
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
