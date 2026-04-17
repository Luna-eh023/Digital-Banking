const { Users, Prizes, GachaHistories } = require('../../../models');

async function getUserById(id) {
  return Users.findById(id);
}

async function updateUserGacha(id, count, date) {
  return Users.updateOne(
    { _id: id },
    {
      $set: {
        gachaCount: count,
        lastGachaDate: date,
      },
    }
  );
}

async function getAvailablePrizes() {
  return Prizes.find({});
}

async function updatePrizeWinner(id, count) {
  return Prizes.updateOne(
    { _id: id },
    {
      $set: {
        currentWinner: count,
      },
    }
  );
}

async function saveHistory(userId, prizeId, prizeName, isWin) {
  return GachaHistories.create({
    userId,
    prizeId: prizeId || null,
    prizeName: prizeName || null,
    isWin,
    playedAt: new Date(),
  });
}

async function getHistoryByUserId(userId) {
  return GachaHistories.find({ userId }).sort({ playedAt: -1 });
}

async function getWinners() {
  return GachaHistories.find({ isWin: true })
    .populate('userId', 'fullName')
    .sort({ playedAt: -1 });
}

module.exports = {
  getUserById,
  updateUserGacha,
  getAvailablePrizes,
  updatePrizeWinner,
  saveHistory,
  getHistoryByUserId,
  getWinners,
};
