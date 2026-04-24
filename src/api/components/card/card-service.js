const cardRepository = require('./card-repository');

exports.toggleCardStatus = async (cardId, isActive) => {
  const card = await cardRepository.getCardById(cardId);

  if (!card) {
    throw new Error('Kartu tidak ditemukan.');
  }

  return await cardRepository.updateStatus(cardId, isActive);
};

exports.getUserCards = async (userId) =>
  await cardRepository.getCardsByUserId(userId);
exports.createCard = async (payload) => {
  const { userId, cardNumber, cardType } = payload;

  // validation
  if (!userId || !cardNumber || !cardType) {
    throw new Error('userId, cardNumber, dan cardType wajib diisi');
  }

  // optional: check duplicate card number
  const existing = await cardRepository.getCardsByUserId(userId);
  const isDuplicate = existing.find((c) => c.cardNumber === cardNumber);
  if (isDuplicate) {
    throw new Error('Nomor kartu sudah digunakan');
  }

  return await cardRepository.createCard(payload);
};
