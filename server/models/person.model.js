import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
  personTagId: {
    type: String,
    trim: true,
    required: 'Personel ID numarasının belirtilmesi zorunludur.',
    unique: 'Personel ID numarası sistemimizde kayıtlıdır.'
  },
  firstName: {
    type: String,
    trim: true,
    required: 'Personel isminin belirtilmesi zorunludur.'
  },
  lastName: {
    type: String,
    trim: true,
    required: 'Personel soyisminin belirtilmesi zorunludur'
  },
  phone1: {
    type: String,
    trim: true,
    required: 'En az bir adet telefon numarasının belirtilmesi zorunludur'
  },
  phone2: {
    type: String,
    trim: true
  },
  address1: {
    type: String,
    trim: true,
    required: 'En az bir adet kişi adresinin belirtilmesi zorunludur.'
  },
  address2: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, "Lütfen geçerli bir email adresi giriniz"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  departments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Department'
    }
  ],
});

PersonSchema
  .virtual('fullname')
  .get(function(){
    return `${this.firstName} ${this.lastName}`
  })

export default mongoose.model('Person', PersonSchema);
