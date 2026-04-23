const express = require('express');
const paymentsController = require('./payments-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/payments', route);

  route.post('/charge', paymentsController.createPayment);

  route.get('/:id/status', paymentsController.getPaymentStatus);

  route.post('/webhook', paymentsController.handleWebhook);
};
