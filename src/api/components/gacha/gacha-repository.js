const { Users, Prizes } = require('../../../models');

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

module.exports = {
  getUserById,
  updateUserGacha,
  getAvailablePrizes,
  updatePrizeWinner,
};
