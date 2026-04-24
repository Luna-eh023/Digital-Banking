const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const otp = require('./components/OTP/OTP-Routes');
const card = require('./components/card/card-routes');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  otp(app);
  card(app);

  return app;
};
