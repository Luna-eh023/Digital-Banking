const {
  getTransactionsByAccountNumber,
  findAccountByNumber,
  updateAccountBalance,
  createTransaction,
} = require('./transaction-repository');

const generateRef = () => `TRX${Date.now()}`;

// ================= GET =================
async function getMutations(accountNumber) {
  const transactions = await getTransactionsByAccountNumber(accountNumber);

  return {
    status: 'success',
    data: transactions,
  };
}

// ================= TRANSFER =================
async function transferInternal(fromAcc, toAcc, amount, description) {
  const from = await findAccountByNumber(fromAcc);
  const to = await findAccountByNumber(toAcc);

  if (!from || !to) throw new Error('Account not found');
  if (from.balance < amount) throw new Error('Insufficient balance');

  const fee = 2500;
  const ref = generateRef();

  await updateAccountBalance(fromAcc, from.balance - amount - fee);
  await updateAccountBalance(toAcc, to.balance + amount);

  await createTransaction({
    fromAccount: fromAcc,
    toAccount: toAcc,
    amount,
    description,
    type: 'debit',
  });

  await createTransaction({
    fromAccount: fromAcc,
    toAccount: toAcc,
    amount,
    description,
    type: 'credit',
  });

  return {
    referenceNo: ref,
    fromAccount: fromAcc,
    toAccount: toAcc,
    amount,
  };
}

module.exports = {
  getMutations,
  transferInternal,
};
