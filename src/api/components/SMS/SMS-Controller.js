const smsService = require('./SMS-Service');

async function sendSMS(req, res) {
  try {
    const { phone, message, type } = req.body;

    // basic validation
    if (!phone || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone and message are required',
      });
    }

    // simple phone validation (Indonesia example)
    if (!phone.startsWith('+62')) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid phone format',
      });
    }

    const result = await smsService.sendSMS(phone, message, type);

    res.json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

module.exports = { sendSMS };
