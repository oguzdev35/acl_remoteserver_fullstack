import mongoose from 'mongoose';

const DoorSchema = new mongoose.Schema({
  doorId: {
    type: String,
    trim: true,
    required: 'Door ID is required',
    unique: 'Door ID already exists'
  },
  name: {
    type: String,
    trim: true,
    required: 'Door name is required'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  logs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Log'
    }
  ]
});

export default mongoose.model('Door', DoorSchema);