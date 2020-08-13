import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  door: {
    type: mongoose.Schema.ObjectId,
    ref: 'Door'
  },
  person: {
    type: mongoose.Schema.ObjectId,
    ref: 'Person'
  },
  block: {
    type: mongoose.Schema.ObjectId,
    ref: 'Block'
  },
  place: {
    type: mongoose.Schema.ObjectId,
    ref: 'Place'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
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