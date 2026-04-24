const express = require('express');

const router = express.Router();

const controller = require('./accounts-controller');

// CREATE
router.post('/accounts', controller.createAccount);

// GET ALL
router.get('/accounts', controller.getAllAccounts);

// GET BALANCE
router.get('/accounts/:accountNumber/balance', controller.getBalance);

module.exports = router;
