import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: 'Kullanıcı adı belirtmeniz zorunludur.'
  },
  isMaster: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    trim: true,
    unique: 'Bu Email adresi zaten kayıtlı.',
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: 'Email adresi belirtmeniz zorunludur.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  hashed_password: {
    type: String,
    required: 'Şifre belirtmeniz zorunludur.'
  },
  places: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Place'
    }
  ],
  logs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Log'
    }
  ],
  salt: String,
  secretToken: String
});


// add class methods to the User Class
UserSchema.methods = {
  authenticate: function(plainText){
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password){
    if(!password) return '';
    try {
        return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
    } catch (err) {
        return '';
    }
  },
  makeSalt: function(){
    return Math.round((new Date().valueOf() * Math.random())) + '';
  }
};

UserSchema
    .virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    });

UserSchema.path('hashed_password').validate(function(v){
  if(this._password && this._password.length < 6){
      this.invalidate('password', 'Şifre en az 6 karakterli olmalıdır.');
  }
  if(this.isNew && !this.password){
      this.invalidate('password', 'Şifre belirtmeniz zorunludur.');
  }
}, null);

export default mongoose.model('User', UserSchema);