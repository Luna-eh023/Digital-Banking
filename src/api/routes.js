const express = require('express');

const accountsRoutes = require('./components/accounts/accounts-route');
const transactionRoutes = require('./components/transfer di m-banking/transaction-route');

module.exports = () => {
  const app = express.Router();

  app.use(accountsRoutes);
  app.use(transactionRoutes);

  return app;
};
