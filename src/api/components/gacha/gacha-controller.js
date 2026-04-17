const gachaService = require('./gacha-service');

async function gacha(req, res, next) {
  try {
    const { user_id: userId } = req.body;

    const result = await gachaService.gacha(userId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getHistory(req, res, next) {
  try {
    const { userId } = req.params;

    const histories = await gachaService.getHistory(userId);

    res.status(200).json(histories);
  } catch (error) {
    next(error);
  }
}

async function getPrizes(req, res, next) {
  try {
    const prizes = await gachaService.getPrizes();

    res.status(200).json(prizes);
  } catch (error) {
    next(error);
  }
}

async function getWinners(req, res, next) {
  try {
    const winners = await gachaService.getWinners();

    res.status(200).json(winners);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  gacha,
  getHistory,
  getPrizes,
  getWinners,
};
