const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  // User & Driver References
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  
  // Ride Details
  pickupLocation: {
    address: String,
    lat: Number,
    lng: Number
  },
  dropLocation: {
    address: String,
    lat: Number,
    lng: Number
  },
  distance: {
    type: Number, // in kilometers
    required: true
  },
  estimatedTime: {
    type: Number, // in minutes
    required: true
  },
  memberCount: {
    type: Number,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['2-seater', '3-8-seater', '10+-seater'],
    required: true
  },
  
  // Pricing
  baseFare: {
    type: Number,
    required: true
  },
  distanceFare: {
    type: Number,
    required: true
  },
  totalFare: {
    type: Number,
    required: true
  },
  
  // Status & OTP
  status: {
    type: String,
    enum: ['pending', 'accepted', 'arrived', 'started', 'completed', 'cancelled'],
    default: 'pending'
  },
  otp: {
    type: String,
    required: true
  },
  cancellationReason: String,
  
  // Timestamps
  requestedAt: {
    type: Date,
    default: Date.now
  },
  acceptedAt: Date,
  arrivedAt: Date,
  startedAt: Date,
  completedAt: Date,
  cancelledAt: Date,
  
  // Payment Info
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed', 'refunded'],
    default: 'pending'
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  
  // Tracking
  routePolyline: String,
  actualDistance: Number,
  actualTime: Number
}, {
  timestamps: true
});

rideSchema.index({ user: 1, createdAt: -1 });
rideSchema.index({ driver: 1, createdAt: -1 });
rideSchema.index({ status: 1 });

module.exports = mongoose.model('Ride', rideSchema);