import mongoose from 'mongoose';

const credentialRequestSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default:Date.now,
    },
});

const Credentials = mongoose.model('Credentials',credentialRequestSchema);

export default Credentials;