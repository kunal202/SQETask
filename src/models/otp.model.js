const mongoose = require('mongoose');

const otpSchema = mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
      index: true,
    },
    user_id: {
      type: String,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['created', 'validated', 'expired'],
      default: 'created',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Otp
 */
const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
