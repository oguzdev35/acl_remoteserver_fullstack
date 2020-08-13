import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Block name is required' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    doors: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Door'
        }
    ],
    logs: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Log'
        }
    ]
})

export default mongoose.model('Block', BlockSchema);