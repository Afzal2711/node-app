import express from 'express';
import Credentials from '../models/request-credentials.js';

const router = express.Router();

router.post('/request-credentials', async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const credentialRequest = new Credentials({ name, email, role });
    await credentialRequest.save();
    res.status(201).json({ message: 'Credentials requested successfully!' });
  } catch (error) {
    console.error('Error saving credential request:', error);
    res.status(500).json({ message: 'Failed to request credentials' });
  }
});

export default router;