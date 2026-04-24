const cardService = require('./card-service');

// ✅ CREATE
exports.createCard = async (req, res) => {
  try {
    const { userId, cardNumber, cardType } = req.body;

    if (!userId || !cardNumber || !cardType) {
      throw new Error('userId, cardNumber, dan cardType wajib diisi');
    }

    const newCard = await cardService.createCard({
      userId,
      cardNumber,
      cardType,
    });

    res.status(201).json({
      status: 'Success',
      message: 'Kartu berhasil dibuat',
      data: newCard,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// ✅ UPDATE STATUS
exports.updateCardStatus = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      throw new Error('isActive harus bernilai true atau false');
    }

    const updatedCard = await cardService.toggleCardStatus(cardId, isActive);

    res.status(200).json({
      status: 'Success',
      message: `Kartu berhasil ${isActive ? 'diaktifkan' : 'dinonaktifkan'}`,
      data: updatedCard,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// ✅ GET USER CARDS
exports.fetchUserCards = async (req, res) => {
  try {
    const { userId } = req.params;
    const cards = await cardService.getUserCards(userId);

    res.status(200).json({
      status: 'Success',
      data: cards,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
