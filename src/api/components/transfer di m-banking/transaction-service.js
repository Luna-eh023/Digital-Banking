const {
  getTransactionsByAccountId,
  findAccountById,
  updateAccountBalance,
  createTransaction,
} = require('./transaction-repository');

const { errorResponder, errorTypes } = require('../../../core/errors');

const generateRef = () => `TRX${Date.now()}`;

// ================= MUTASI =================
async function getMutations(accountId) {
  const transactions = await getTransactionsByAccountId(accountId);

  return {
    status: 'success',
    data: transactions.map((trx) => ({
      date: trx.createdAt,
      type: trx.type === 'credit' ? 'CR' : 'DB',
      amount: trx.amount,
      description: trx.description || 'Transfer',
    })),
  };
}

// ================= TRANSFER =================
async function transferInternal(
  fromAccountId,
  toAccountId,
  amount,
  description
) {
  const fromAccount = await findAccountById(fromAccountId);
  const toAccount = await findAccountById(toAccountId);

  if (!fromAccount || !toAccount) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Account not found');
  }

  if (fromAccount.balance < amount) {
    throw errorResponder(errorTypes.VALIDATION_ERROR, 'Insufficient balance');
  }

  const fee = 2500;
  const ref = generateRef();
  await updateAccountBalance(fromAccountId, fromAccount.balance - amount - fee);
  await updateAccountBalance(toAccountId, toAccount.balance + amount);

  // simpan transaksi
  await createTransaction({
    fromAccount: fromAccountId,
    toAccount: toAccountId,
    amount,
    description,
    type: 'debit',
  });

  await createTransaction({
    fromAccount: fromAccountId,
    toAccount: toAccountId,
    amount,
    description,
    type: 'credit',
  });

  return {
    status: 'success',
    data: {
      referenceNo: ref,
      date: new Date(),
      fromAccount: fromAccount.accountNumber,
      toAccount: toAccount.accountNumber,
      toName: toAccount.name,
      amount,
      fee,
      description,
      service: 'BI FAST',
    },
  };
}

module.exports = {
  getMutations,
  transferInternal,
};
