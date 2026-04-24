const express = require('express');

const router = express.Router();

const controller = require('./transaction-controller');

router.get('/transactions/:accountNumber', controller.getTransactions);

router.post('/transactions/transfer', controller.transfer);

module.exports = router;
