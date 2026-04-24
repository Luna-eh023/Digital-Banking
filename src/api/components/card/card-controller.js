const cardService = require('./card-service');

exports.updateCardStatus = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      throw new Error("isActive harus bernilai true atau false");
    }

    const updatedCard = await cardService.toggleCardStatus(cardId, isActive);
    
    res.status(200).json({
      status: "Success",
      message: `Kartu berhasil ${isActive ? 'diaktifkan' : 'dinonaktifkan'}`,
      data: updatedCard
    });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

exports.fetchUserCards = async (req, res) => {
  try {
    const { userId } = req.params;
    const cards = await cardService.getUserCards(userId);
    res.status(200).json({ status: "Success", data: cards });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};