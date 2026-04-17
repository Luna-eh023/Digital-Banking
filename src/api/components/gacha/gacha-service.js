const gachaRepository = require('./gacha-repository');
const { Prizes } = require('../../../models'); // Pindah ke atas sini biar ESLint gak marah

async function gacha(userId) {
  let user = await gachaRepository.getUserById(userId);

  if (!user) {
    user = { gachaCount: 0, lastGachaDate: new Date() };
  }

  const today = new Date().toDateString();

  let count = user.gachaCount || 0;

  if (user.lastGachaDate) {
    const lastDate = new Date(user.lastGachaDate).toDateString();

    if (lastDate !== today) {
      count = 0;
    }
  } else {
    count = 0;
  }

  if (count >= 5) {
    return {
      message: 'Maksimal 5 kali gacha per hari',
    };
  }

  let prizes = await gachaRepository.getAvailablePrizes();

  if (!prizes || prizes.length === 0) {
    await Prizes.insertMany([
      { name: 'Macbook Pro M3', currentWinner: 0, maxWinner: 1 },
      { name: 'iPhone 15 Pro', currentWinner: 0, maxWinner: 2 },
      { name: 'Voucher 100rb', currentWinner: 0, maxWinner: 5 },
    ]);

    prizes = await gachaRepository.getAvailablePrizes();
  }

  const randomIndex = Math.floor(Math.random() * prizes.length);

  const prize = prizes[randomIndex];

  let result = {
    message: 'Belum beruntung',
  };

  if (prize.currentWinner < prize.maxWinner) {
    const newWinner = prize.currentWinner + 1;

    await gachaRepository.updatePrizeWinner(prize.id, newWinner);

    result = {
      message: 'Selamat!',
      prize: prize.name,
    };
  }

  count += 1;

  await gachaRepository.updateUserGacha(userId, count, new Date());

  return result;
}

module.exports = {
  gacha,
};
