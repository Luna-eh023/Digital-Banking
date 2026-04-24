const service = require('./transaction-service');

// GET
const getTransactions = async (req, res) => {
  const result = await service.getMutations(req.params.accountNumber);
  res.json(result);
};

// POST
const transfer = async (req, res) => {
  const result = await service.transferInternal(
    req.body.fromAccountNumber,
    req.body.toAccountNumber,
    req.body.amount,
    req.body.description
  );

  res.json(result);
};

module.exports = { getTransactions, transfer };
