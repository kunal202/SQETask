const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['verified', 'pending', 'deleted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
