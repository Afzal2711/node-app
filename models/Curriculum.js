import mongoose from 'mongoose';

const CurriculumSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    filesize: {
        type: Number,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
},
{ timestamps: true } 
);

const Curriculum = mongoose.model('Curriculum', CurriculumSchema);

export default Curriculum;