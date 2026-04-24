const express = require('express');
const transactionsController = require('./transaction-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/transactions', route);

  route.post('/charge', transactionsController.createTransaction);

  route.post('/webhook', transactionsController.handleWebhook);

  // Endpoint untuk mengecek status transaksi/pembayaran
  route.get('/:id/status', transactionsController.getTransactionStatus);
};
