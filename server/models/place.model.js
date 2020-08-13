import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Place name is required'
    },
    address: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    blocks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Block'
        }
    ],
    persons: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Person'
        }
    ],
    logs: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Log'
        }
      ]
});

export default mongoose.model('Place', PlaceSchema);