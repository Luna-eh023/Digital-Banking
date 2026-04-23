const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const accountsRoutes = require('./components/accounts/accounts-route');
const paymentsRoutes = require('./components/payments/payments-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  paymentsRoutes(app);

  app.use(accountsRoutes); // ← TAMBAH DI SINI

  return app;
};
