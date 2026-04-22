const service = require('./accounts-service')

const createAccount = async (req, res) => {
  try {
    const result = await service.createAccount(req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getBalance = async (req, res) => {
  try {
    const balance = await service.getBalance(req.params.accountNumber)
    res.json({ balance })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

module.exports = {
  createAccount,
  getBalance
}