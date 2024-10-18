import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const {name, email, password, role } =req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).send('User registered successfully!');
    } catch (error) {
        res.status(400).send('Error registering user: '+error.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send('Invalid credentials');

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
});

export default router;


// import express from 'express';
// import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';
// import { roleMiddleware } from '../middleware/roleMiddleware.js';
// import User from '../models/User.js';

// const router = express.Router();

// router.post('/register', verifyFirebaseToken, roleMiddleware(['administrator']), async (req, res) => {
//     const { username, role } = req.body;

//     try {
//         const newUser = new User({ username, role, firebaseId: req.user.uid });
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully', user: newUser });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// export default router;
