const Card = require('../../../models/card-Schema');

exports.getCardById = async (cardId) => {
  return await Card.findById(cardId);
};

exports.updateStatus = async (cardId, isActive) => {
  const newStatus = isActive ? 'ACTIVE' : 'INACTIVE';
  return await Card.findByIdAndUpdate(
    cardId,
    { status: newStatus },
    { new: true }
  );
};

exports.getCardsByUserId = async (userId) => {
  return await Card.find({ userId });
};