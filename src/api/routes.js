const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const sms = require('./components/SMS/SMS-Route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  sms(app);

  return app;
};
