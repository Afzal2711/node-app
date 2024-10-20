import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
   UserName: { type: String, required: true },
   message:{ type: String, required: true, },
   rating: { type: Number, required: true, min: 1, max: 5},
   createdAt:{ type:Date,default: Date.now,},
});

const Feedback = mongoose.model('Feedback',feedbackSchema);

export default Feedback;