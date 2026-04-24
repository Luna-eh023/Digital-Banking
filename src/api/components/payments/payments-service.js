const repository = require('./payments-repository');

async function processEWalletPayment(user, amount) {
  const transaction = await repository.createTransaction({
    user,
    amount,
    status: 'pending',
  });

  return {
    transaction_id: transaction.id,
    amount: transaction.amount,
    // Dummy URL gateway
    payment_url: `https://checkout.gateway.com/v1/pay/${transaction.id}`,
  };
}

async function getPaymentStatus(id) {
  const transaction = await repository.getTransactionById(id);

  if (!transaction) {
    return null;
  }

  return {
    transaction_id: transaction.id,
    user: transaction.user,
    amount: transaction.amount,
    status: transaction.status,
  };
}

async function handleGatewayNotification(payload) {
  const { order_id: orderId, transaction_status: transactionStatus } = payload;

  let finalStatus = 'pending';
  if (['settlement', 'capture'].includes(transactionStatus)) {
    finalStatus = 'success';
  } else if (['expire', 'cancel', 'deny'].includes(transactionStatus)) {
    finalStatus = 'failed';
  }

  return repository.updateTransactionStatus(orderId, finalStatus);
}

module.exports = {
  processEWalletPayment,
  getPaymentStatus,
  handleGatewayNotification,
};
