const service = require('./accounts-service');

// CREATE
const createAccount = async (req, res) => {
  try {
    const result = await service.createAccount(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BALANCE
const getBalance = async (req, res) => {
  try {
    const balance = await service.getBalance(req.params.accountNumber);
    res.json({ balance });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// GET ALL
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await service.getAllAccounts();

    const clean = accounts.map((acc) => ({
      accountNumber: acc.accountNumber,
      name: acc.name,
      balance: acc.balance,
    }));

    res.json(clean);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAccount,
  getBalance,
  getAllAccounts,
};
