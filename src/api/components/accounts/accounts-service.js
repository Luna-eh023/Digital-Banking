const repo = require('./accounts-repository')

const createAccount = async (payload) => {
  return await repo.createAccount(payload)
}

const getBalance = async (accountNumber) => {
  const account = await repo.getAccountByNumber(accountNumber)

  if (!account) {
    throw new Error('Account not found')
  }

  return account.balance
}


const getAllAccounts = async () => {
  return await repo.getAllAccounts()
}

module.exports = {
  createAccount,
  getBalance,
  getAllAccounts // ← jangan lupa export
}