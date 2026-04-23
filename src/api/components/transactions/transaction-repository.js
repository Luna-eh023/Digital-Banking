const { Transaction } = require('../../../models');

async function createTransaction(data) {
  return Transaction.create(data);
}

async function getTransactionById(id) {
  return Transaction.findById(id);
}

async function updateTransactionStatus(id, status) {
  return Transaction.updateOne({ _id: id }, { $set: { status } });
}

module.exports = {
  createTransaction,
  getTransactionById,
  updateTransactionStatus,
};
