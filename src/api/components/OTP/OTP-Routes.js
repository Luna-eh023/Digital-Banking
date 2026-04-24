const otpController = require('./otp-controller');

module.exports = (app) => {
  app.post('/otp/generate', otpController.createOTP);
  app.get('/otp/:phoneNumber', otpController.showOTP);
};