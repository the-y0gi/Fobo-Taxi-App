const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  
  // Payment Details
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  razorpayOrderId: {
    type: String,
    required: true
  },
  razorpayPaymentId: String,
  razorpaySignature: String,
  
  // Status
  status: {
    type: String,
    enum: ['created', 'attempted', 'success', 'failed'],
    default: 'created'
  },
  
  // Refund Info
  refundStatus: {
    type: String,
    enum: ['none', 'requested', 'processed', 'failed'],
    default: 'none'
  },
  refundAmount: Number,
  refundReason: String,
  razorpayRefundId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);