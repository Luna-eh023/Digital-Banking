const gachaService = require('./gacha-service');

async function gacha(req, res, next) {
  try {
    const { userId } = req.body;

    const result = await gachaService.gacha(userId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  gacha,
};
