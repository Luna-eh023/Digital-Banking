const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: {
    type: String, // Bisa dihubungkan ke ID User Anda
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cardType: {
    type: String,
    enum: ['DEBIT', 'CREDIT'],
    default: 'DEBIT',
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'],
    default: 'ACTIVE',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Card', cardSchema);