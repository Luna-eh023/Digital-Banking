const express = require('express');

const router = express.Router();

const transactionController = require('./transaction-controller');

router.get('/transactions/:accountId', transactionController.getTransactions);

router.post('/transactions/transfer', transactionController.transfer);

module.exports = router;
