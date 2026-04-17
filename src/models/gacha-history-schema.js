module.exports = (mongoose) => {
  if (mongoose.models.GachaHistories) {
    return mongoose.models.GachaHistories;
  }

  const schema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },

    prizeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prizes',
      default: null,
    },

    prizeName: {
      type: String,
      default: null,
    },

    isWin: {
      type: Boolean,
      default: false,
    },

    playedAt: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('GachaHistories', schema);
};
