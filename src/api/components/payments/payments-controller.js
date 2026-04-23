const paymentsService = require('./payments-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createPayment(request, response, next) {
  try {
    const { user, amount } = request.body;

    if (!user || !amount) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'User and amount are required'
      );
    }

    const result = await paymentsService.processEWalletPayment(user, amount);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function handleWebhook(request, response, next) {
  try {
    // Nerima notifikasi otomatis dari Payment Gateway
    await paymentsService.handleGatewayNotification(request.body);

    return response
      .status(200)
      .json({ message: 'Webhook processed successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createPayment,
  handleWebhook,
};
