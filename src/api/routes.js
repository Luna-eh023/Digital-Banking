const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const accountsRoutes = require('./components/accounts/accounts-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);

  app.use(accountsRoutes); // ← TAMBAH DI SINI

  return app;
};