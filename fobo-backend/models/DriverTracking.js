const mongoose = require('mongoose');

const driverTrackingSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  
  // Time Tracking (in minutes)
  onlineTime: {
    type: Number,
    default: 0
  },
  onRideTime: {
    type: Number,
    default: 0
  },
  breakTime: {
    type: Number,
    default: 0
  },
  idleTime: {
    type: Number,
    default: 0
  },
  
  // Daily Stats
  totalTrips: {
    type: Number,
    default: 0
  },
  completedTrips: {
    type: Number,
    default: 0
  },
  cancelledTrips: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

driverTrackingSchema.index({ driver: 1, date: 1 });

module.exports = mongoose.model('DriverTracking', driverTrackingSchema);