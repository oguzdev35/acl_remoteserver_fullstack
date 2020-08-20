import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Departman ismi belirtmeniz zorunludur.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  persons: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Person'
    }
  ],
});

export default mongoose.model('Department', DepartmentSchema);
