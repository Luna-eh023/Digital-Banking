module.exports = (mongoose) => {
  if (mongoose.models.Prizes) {
    return mongoose.models.Prizes;
  }

  const schema = new mongoose.Schema({
    name: String,

    maxWinner: Number,

    currentWinner: {
      type: Number,
      default: 0,
    },
  });

  return mongoose.model('Prizes', schema);
};
