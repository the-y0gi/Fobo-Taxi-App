const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    default: ''
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  rideHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);