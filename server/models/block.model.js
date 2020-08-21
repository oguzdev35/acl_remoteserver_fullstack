import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Blok ismi belirtmeniz zorunludur.' 
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
})

export default mongoose.model('Block', BlockSchema);