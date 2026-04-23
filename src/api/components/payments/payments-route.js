const express = require('express');
const paymentsController = require('./payments-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/payments', route);

  // User klik "Bayar"
  route.post('/charge', paymentsController.createPayment);

  // Gateway ngirim status pembayaran
  route.post('/webhook', paymentsController.handleWebhook);
};
