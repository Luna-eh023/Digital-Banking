const { Account } = require('../../../models');

// ================= CREATE ACCOUNT =================
const createAccount = async (data) => {
  const account = await Account.create(data);
  return account;
};

// ================= GET BALANCE =================
const getBalance = async (accountNumber) => {
  const account = await Account.findOne({ accountNumber });

  if (!account) {
    throw new Error('Account not found');
  }

  return account.balance;
};

// ================= GET ALL =================
const getAllAccounts = async () => {
  return Account.find();
};

module.exports = {
  createAccount,
  getBalance,
  getAllAccounts,
};
