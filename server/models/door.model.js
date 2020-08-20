import mongoose from 'mongoose';

const DoorSchema = new mongoose.Schema({
  doorTagId: {
    type: String,
    trim: true,
    required: 'Kapı ID numarasının belirtilmesi zorunludur.',
    unique: 'Kapı ID numarası sistemimizde kayıtlı bulunmaktadır.'
  },
  name: {
    type: String,
    trim: true,
    required: 'Kapı isminin belirtilmesi zorunludur.'
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