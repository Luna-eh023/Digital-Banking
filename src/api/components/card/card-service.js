const cardRepository = require('./card-repository');

exports.toggleCardStatus = async (cardId, isActive) => {
  const card = await cardRepository.getCardById(cardId);
  
  if (!card) {
    throw new Error("Kartu tidak ditemukan.");
  }

  return await cardRepository.updateStatus(cardId, isActive);
};

exports.getUserCards = async (userId) => {
  return await cardRepository.getCardsByUserId(userId);
};