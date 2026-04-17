const gachaRepository = require('./gacha-repository');
const { Prizes } = require('../../../models');

function maskName(name) {
  if (!name) return '***';
  return name
    .split(' ')
    .map((word) => {
      if (word.length <= 1) return word;
      return word
        .split('')
        .map((char, i) => {
          if (i === 0) return char;
          return Math.random() < 0.5 ? '*' : char;
        })
        .join('');
    })
    .join(' ');
}

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
      message: 'Gacha limit reached (Max 5 per day)',
    };
  }

  let prizes = await gachaRepository.getAvailablePrizes();

  if (!prizes || prizes.length === 0) {
    await Prizes.insertMany([
      { name: 'Emas 10 gram', currentWinner: 0, maxWinner: 1 },
      { name: 'Smartphone X', currentWinner: 0, maxWinner: 5 },
      { name: 'Smartwatch Y', currentWinner: 0, maxWinner: 10 },
      { name: 'Voucher Rp100.000', currentWinner: 0, maxWinner: 100 },
      { name: 'Pulsa Rp50.000', currentWinner: 0, maxWinner: 500 },
    ]);

    prizes = await gachaRepository.getAvailablePrizes();
  }

  const randomIndex = Math.floor(Math.random() * prizes.length);
  const prize = prizes[randomIndex];

  let result = {
    message: 'Belum beruntung, coba lagi!',
    prize: null,
  };

  if (prize.currentWinner < prize.maxWinner) {
    const newWinner = prize.currentWinner + 1;
    await gachaRepository.updatePrizeWinner(prize.id, newWinner);

    result = {
      message: 'Congratulations!',
      prize: prize.name,
    };

    await gachaRepository.saveHistory(userId, prize.id, prize.name, true);
  } else {
    await gachaRepository.saveHistory(userId, null, null, false);
  }

  count += 1;
  await gachaRepository.updateUserGacha(userId, count, new Date());

  return result;
}

async function getHistory(userId) {
  const histories = await gachaRepository.getHistoryByUserId(userId);
  return histories.map((h) => ({
    playedAt: h.playedAt,
    isWin: h.isWin,
    prize: h.prizeName || null,
  }));
}

async function getPrizes() {
  const prizes = await gachaRepository.getAvailablePrizes();
  return prizes.map((p) => ({
    name: p.name,
    quota: p.maxWinner,
    remainingQuota: p.maxWinner - p.currentWinner,
  }));
}

async function getWinners() {
  const winners = await gachaRepository.getWinners();
  return winners.map((w) => ({
    prize: w.prizeName,
    winnerName: maskName(w.userId ? w.userId.fullName : 'Unknown'),
    wonAt: w.playedAt,
  }));
}

module.exports = {
  gacha,
  getHistory,
  getPrizes,
  getWinners,
};
