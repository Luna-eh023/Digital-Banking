const express = require('express');

const router = express.Router();
const Transaction = require('../models/transaction');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');

router.post('/transaction', async (req, res) => {
  const data = await Transaction.create(req.body);
  res.json(data);
});

router.get('/transaction/:id/status', async (req, res) => {
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

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);

  return app;
};

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);

  return app;
};

module.exports = router;
