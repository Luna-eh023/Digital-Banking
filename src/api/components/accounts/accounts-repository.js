const { Account } = require('../../../models')

const createAccount = async (data) => {
  return await Account.create(data)
}

const getAccountByNumber = async (accountNumber) => {
  return await Account.findOne({ accountNumber })
}

const getAllAccounts = async () => {
  return await Account.find()
}

module.exports = {
  createAccount,
  getAccountByNumber,
  getAllAccounts
}