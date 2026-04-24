module.exports = (app) => {
  const controller = require('./user-controller');

  app.post('/users/change-pin', controller.changePIN);
};