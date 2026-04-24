const smsService = require('./SMS-Service');

async function sendSMS(req, res) {
  console.log('🔥 CONTROLLER HIT');

  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({
      message: 'Phone and message required',
    });
  }

  const result = await smsService.sendSMS(phone, message);

  res.json({
    status: 'success',
    data: result,
  });
}

module.exports = { sendSMS };
