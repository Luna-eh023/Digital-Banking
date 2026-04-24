async function sendSMS(phone, message) {
  return {
    status: 'SENT',
    phone,
    message,
    info: 'Mock SMS (echo)',
  };
}

module.exports = { sendSMS };
