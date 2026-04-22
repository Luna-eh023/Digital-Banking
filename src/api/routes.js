const express = require('express');

const { Transaction } = require('../models');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);

  app.post('/transaction', async (req, res) => {
    try {
      const data = await Transaction.create(req.body);
      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });

  app.get('/transaction/:id/status', async (req, res) => {
    try {
      const trx = await Transaction.findById(req.params.id);

      if (!trx) {
        return res.status(404).json({
          message: 'Transaksi tidak ditemukan',
        });
      }

      return res.json({
        id: trx.id,
        status: trx.status,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });

  return app;
};
