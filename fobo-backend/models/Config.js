const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  baseFare: {
    '2-seater': Number,
    '3-8-seater': Number,
    '10+-seater': Number
  },
  perKmRate: {
    '2-seater': Number,
    '3-8-seater': Number,
    '10+-seater': Number
  },
  perMinuteRate: {
    '2-seater': Number,
    '3-8-seater': Number,
    '10+-seater': Number
  },
  cancellationFee: Number,
  searchRadius: {
    type: Number,
    default: 5
  },
  driverTimeout: {
    type: Number,
    default: 30
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Config', configSchema);