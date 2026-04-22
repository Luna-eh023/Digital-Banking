const express = require('express')
const router = express.Router()
const controller = require('./accounts-controller')

router.post('/accounts', controller.createAccount)
router.get('/accounts/:accountNumber/balance', controller.getBalance)

module.exports = router