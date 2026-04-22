const Account = require('../../../models/account')

const createAccount = async (data) => {
  return await Account.create(data)
}

const getAccountByNumber = async (accountNumber) => {
  return await Account.findOne({ accountNumber })
}

module.exports = {
  createAccount,
  getAccountByNumber
}