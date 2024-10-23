console.log('Server script started...');

import admin from 'firebase-admin';
import Feedback from './models/Feedback.js';
import express from 'express';
import mongoose from 'mongoose';
import curriculumRoutes from './routes/curriculumRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { verifyToken } from './middleware/authMiddleware.js';
import { authorizeRoles } from './middleware/roleMiddleware.js';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// admin.initializeApp({
//     credential: admin.credential.cert({
//         "type": process.env.FIREBASE_TYPE,
//         "project_id": process.env.FIREBASE_PROJECT_ID,
//         "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
//         "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//         "client_email": process.env.FIREBASE_CLIENT_EMAIL,
//         "client_id": process.env.FIREBASE_CLIENT_ID,
//         "auth_uri": process.env.FIREBASE_AUTH_URI,
//         "token_uri": process.env.FIREBASE_TOKEN_URI,
//         "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//         "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
//     })
// });

const app = express();
// app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

const allowedOrigins = ['https://node-app-p2dr.onrender.com/feedback'];
app.use(cors({ origin: allowedOrigins }));


console.log('Starting the server...');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/',feedbackRoutes);

app.use('/uploads',express.static(path.join(path.resolve(), 'uploads')));

app.use('/curriculum',curriculumRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});

app.use('/api/auth', authRoutes );

app.get('/admin', verifyToken, authorizeRoles('administrator'),(req, res) => {
    res.send('welcome,admin!');
});

app.get('/trainer', verifyToken, authorizeRoles('trainer','administrator'),(req, res) => {
    res.send('welcome,Trainer');
});

app.get('/employee', verifyToken, authorizeRoles('employee','trainer','administrator'),(req, res) => {
    res.send('welcome,employee!');
});

// app.listen(PORT, () => {
//     console.log('Server is running on port ${PORT}');
// });
