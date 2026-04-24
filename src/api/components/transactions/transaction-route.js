const express = require('express');
const router = express.Router();
const controller = require('./transaction-controller');
const authMiddleware = require('../../middlewares/auth-middleware');

router.post('/transactions', authMiddleware, controller.transfer);
router.get('/transactions/:accountNumber', authMiddleware, controller.getHistory);

module.exports = router;