const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    user: String,
    amount: Number,
    status: {
      type: String,
      enum: ['success', 'pending', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
