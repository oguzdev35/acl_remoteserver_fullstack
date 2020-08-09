import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  doorId: {
    type: String,
    trim: true,
    required: 'Door ID is required',
  },
  doorName: {
    type: String,
    trim: true,
    required: 'Door name is required'
  },
  personId: {
    type: String,
    trim: true,
    required: 'Door name is required'
  },
  personFullName: {
    type: String,
    trim: true,
    required: 'Person fullname is required'
  },
  accessTime: {
    type: Date,
    default: Date.now
  },
  isPermitted: {
    type: Boolean
  }
});

export default mongoose.model('Log', LogSchema);