const service = require('./transaction-service');

const transfer = async (req, res) => {
  try {
    const { fromAccount, toAccount, amount } = req.body;

    const result = await service.transfer(
      fromAccount,
      toAccount,
      amount
    );

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const data = await service.getHistory(accountNumber);

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  transfer,
  getHistory
};