const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  // Personal Details
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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
  address: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    default: ''
  },
  
  // Employee Details
  employeeId: {
    type: String,
    unique: true,
    required: true
  },
  
  // Vehicle Details
  vehicle: {
    carName: String,
    carModel: String,
    carNumber: String,
    carType: {
      type: String,
      enum: ['2-seater', '3-8-seater', '10+-seater'],
      required: true
    },
    carColor: String,
    carPhoto: String
  },
  
  // Documents
  documents: {
    drivingLicense: String,
    vehicleRC: String,
    insurance: String,
    aadhaar: String
  },
  
  // Status & Location
  isApproved: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['offline', 'online', 'arriving', 'on-ride', 'break'],
    default: 'offline'
  },
  currentLocation: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
    address: String
  },
  
  // Statistics
  totalTrips: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  cancellationRate: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Driver', driverSchema);