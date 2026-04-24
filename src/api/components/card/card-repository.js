const Card = require('../../../models/card-Schema');

exports.getCardById = async (cardId) => await Card.findById(cardId);

exports.updateStatus = async (cardId, isActive) => {
  const newStatus = isActive ? 'ACTIVE' : 'INACTIVE';
  return await Card.findByIdAndUpdate(
    cardId,
    { status: newStatus },
    { new: true }
  );
};

exports.getCardsByUserId = async (userId) => await Card.find({ userId });
exports.createCard = async (payload) => {
  const card = new Card(payload);
  return await card.save();
};
