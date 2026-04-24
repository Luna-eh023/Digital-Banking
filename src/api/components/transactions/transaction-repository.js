const { Transaction, Account } = require('../../../models');

const getAccountByNumber = async (accountNumber) => {
  return await Account.findOne({ accountNumber });
};

const updateBalance = async (accountNumber, newBalance) => {
  return await Account.findOneAndUpdate(
    { accountNumber },
    { balance: newBalance },
    { new: true }
  );
};

const createTransaction = async (data) => {
  return await Transaction.create(data);
};

const getTransactionsByAccount = async (accountNumber) => {
  return await Transaction.find({
    $or: [
      { fromAccount: accountNumber },
      { toAccount: accountNumber }
    ]
  }).sort({ createdAt: -1 });
};

module.exports = {
  getAccountByNumber,
  updateBalance,
  createTransaction,
  getTransactionsByAccount
};