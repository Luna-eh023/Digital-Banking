const express = require('express')
const router = express.Router()

// contoh endpoint
router.get('/transactions', (req, res) => {
  res.json({ message: 'Transactions route working' })
})

module.exports = router