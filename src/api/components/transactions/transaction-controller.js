const transactionsService = require('./transaction-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createTransaction(request, response, next) {
  try {
    const { user, amount } = request.body;

    if (!user || !amount) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'User and amount are required'
      );
    }

    const result = await transactionsService.processPayment(user, amount);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function handleWebhook(request, response, next) {
  try {
    // Menerima notifikasi otomatis dari Payment Gateway
    await transactionsService.handleGatewayNotification(request.body);

    return response
      .status(200)
      .json({ message: 'Webhook processed successfully' });
  } catch (error) {
    return next(error);
  }
}

async function getTransactionStatus(request, response, next) {
  try {
    const { id } = request.params;
    const result = await transactionsService.getTransactionStatus(id);

    if (!result) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Transaction not found');
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createTransaction,
  handleWebhook,
  getTransactionStatus,
};
