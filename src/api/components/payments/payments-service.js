const repository = require('./payments-repository');

async function processEWalletPayment(user, amount) {
  // Simulasi: Buat record transaksi di DB dengan status 'pending'
  const transaction = await repository.createTransaction({
    user,
    amount,
    status: 'pending',
  });

  // Di sini nanti tempat naro logic hit API Midtrans/Xendit
  return {
    transaction_id: transaction.id,
    amount: transaction.amount,
    status: transaction.status,
    // URL simulasi untuk redirect ke halaman pembayaran e-wallet
    payment_url: `https://checkout.gateway.com/v1/pay/${transaction.id}`,
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
  handleGatewayNotification,
};
