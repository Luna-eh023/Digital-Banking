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

module.exports = {
  createAccount,
  getBalance
}