module.exports = (app) => {
  console.log('✅ SMS ROUTE REGISTERED');

  const controller = require('./SMS-Controller');

  app.post('/notifications/sms', controller.sendSMS);
};
