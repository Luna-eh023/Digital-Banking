const express = require('express');
const router = express.Router();
const controller = require('./auth-controller');

router.post('/login', controller.postLogin);

module.exports = router;
