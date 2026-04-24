const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const sms = require('./components/SMS/SMS-Route');
const accountsRoutes = require('./components/accounts/accounts-route');
const transactionsRoutes = require('./components/transactions/transaction-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  transactionsRoutes(app);
  sms(app);

  app.use(accountsRoutes);

  return app;
};
