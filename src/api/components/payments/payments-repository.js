const models = require('../../../models');

async function createTransaction(data) {
  return models.Transaction.create(data);
}

async function getTransactionById(id) {
  return models.Transaction.findById(id);
}

async function updateTransactionStatus(id, status) {
  return models.Transaction.updateOne({ _id: id }, { $set: { status } });
}

module.exports = {
  createTransaction,
  getTransactionById,
  updateTransactionStatus,
};
