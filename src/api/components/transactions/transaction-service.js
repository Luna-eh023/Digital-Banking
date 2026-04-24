const repo = require('./transaction-repository');

const transfer = async (fromAccount, toAccount, amount) => {
  // Validasi input
  if (!fromAccount || !toAccount || !amount) {
    throw new Error('Incomplete data');
  }

  if (amount <= 0) {
    throw new Error('Invalid amount');
  }

  // Ambil data akun
  const sender = await repo.getAccountByNumber(fromAccount);
  const receiver = await repo.getAccountByNumber(toAccount);

  if (!sender || !receiver) {
    throw new Error('Account not found');
  }

  // Cek saldo
  if (sender.balance < amount) {
    throw new Error('Insufficient balance');
  }

  // Update saldo
  await repo.updateBalance(fromAccount, sender.balance - amount);
  await repo.updateBalance(toAccount, receiver.balance + amount);

  // Simpan transaksi
  const transaction = await repo.createTransaction({
    fromAccount,
    toAccount,
    amount,
    status: 'success'
  });

  return transaction;
};

const getHistory = async (accountNumber) => {
  if (!accountNumber) {
    throw new Error('Account number required');
  }

  return await repo.getTransactionsByAccount(accountNumber);
};

module.exports = {
  transfer,
  getHistory
};