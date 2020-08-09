import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
  personId: {
    type: String,
    trim: true,
    required: 'Person ID is required',
    unique: 'Person ID already exists'
  },
  firstName: {
    type: String,
    trim: true,
    required: 'First Name is required'
  },
  lastName: {
    type: String,
    trim: true,
    required: 'Last Name is required'
  },
  phone1: {
    type: String,
    trim: true,
    required: 'Telephone number is required'
  },
  phone2: {
    type: String,
    trim: true
  },
  address1: {
    type: String,
    trim: true,
    required: 'Address is required'
  },
  address2: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
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
});

export default mongoose.model('Person', PersonSchema);
