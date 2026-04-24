const cardController = require('./card-controller');

module.exports = (app) => {
  // ✅ CREATE CARD (THIS IS WHAT YOU'RE MISSING)
  app.post('/card', cardController.createCard);

  // Update status kartu (Aktif/Nonaktif)
  app.patch('/card/toggle/:cardId', cardController.updateCardStatus);

  // Ambil semua kartu milik user
  app.get('/card/user/:userId', cardController.fetchUserCards);
};
