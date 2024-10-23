import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import Curriculum from '../models/Curriculum.js';

const router = Router();

// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/curriculums'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + extname(file.originalname)); // Append timestamp to filename
    },
});

// File filter for specific file types
const fileFilter = (req, file, cb) => {
    const filetypes = /csv|xlsx|xls|pdf/; // Allowed file types
    const extname = filetypes.test(extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Error: File type not supported!'));
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// POST route to upload curriculum
router.post('/upload', upload.single('curriculumFile'), async (req, res) => {
    try {
        const { topic, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Create a new Curriculum document
        const curriculum = new Curriculum({
            topic: topic,
            description: description,
            fileName: req.file.filename,
            filePath: req.file.path,
        });

        // Save to the database
        await curriculum.save();

        res.status(200).json({ message: 'Curriculum uploaded successfully!' });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload curriculum' });
    }
});

export default router;
