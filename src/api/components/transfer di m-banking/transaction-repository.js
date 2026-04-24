const { Account, Transaction } = require('../../../models');

// ================= GET TRANSAKSI =================
async function getTransactionsByAccountNumber(accountNumber) {
  return Transaction.find({
    $or: [{ fromAccount: accountNumber }, { toAccount: accountNumber }],
  }).sort({ createdAt: -1 });
}

// ================= CARI ACCOUNT =================
async function findAccountByNumber(accountNumber) {
  return Account.findOne({ accountNumber });
}

// ================= UPDATE SALDO =================
async function updateAccountBalance(accountNumber, newBalance) {
  return Account.findOneAndUpdate(
    { accountNumber },
    { balance: newBalance },
    { new: true }
  );
}

// ================= SIMPAN TRANSAKSI =================
async function createTransaction(data) {
  return Transaction.create(data);
}

module.exports = {
  getTransactionsByAccountNumber,
  findAccountByNumber,
  updateAccountBalance,
  createTransaction,
};
