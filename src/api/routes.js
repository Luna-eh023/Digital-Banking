const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const otp = require('./components/OTP/OTP-Routes');
const card = require('./components/card/card-routes');
const sms = require('./components/SMS/SMS-Route');

const accountsRoutes = require('./components/accounts/accounts-route');
const transactionsRoutes = require('./components/transactions/transaction-route');

module.exports = () => {
  const app = express.Router();

  // ROUTES STYLE FUNCTION
  books(app);
  users(app);
  otp(app);
  card(app);
  sms(app);

  // ROUTES STYLE ROUTER
  app.use(accountsRoutes);
  app.use(transactionsRoutes); // ✅ FIX DI SINI

  return app;
};
