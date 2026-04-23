const transactionService = require('./transaction-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

// ================= GET MUTASI =================
async function getTransactions(request, response, next) {
  try {
    const { accountId } = request.params;

    if (!accountId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Account ID is required'
      );
    }

    const result = await transactionService.getMutations(accountId);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// ================= TRANSFER =================
async function transfer(request, response, next) {
  try {
    const { fromAccountId, toAccountId, amount, description } = request.body;

    // VALIDASI
    if (!fromAccountId || !toAccountId || !amount) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'fromAccountId, toAccountId, and amount are required'
      );
    }

    const result = await transactionService.transferInternal(
      fromAccountId,
      toAccountId,
      amount,
      description
    );

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTransactions,
  transfer,
};
