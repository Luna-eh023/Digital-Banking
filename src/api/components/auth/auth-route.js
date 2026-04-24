const express = require('express')
const router = express.Router()
const controller = require('./auth-controller')

router.post('/auth/login', controller.login)

module.exports = router