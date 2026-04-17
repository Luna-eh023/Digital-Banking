module.exports = (db) =>
  db.model(
    'Prizes',
    db.Schema({
      name: {
        type: String,
        required: true,
      },

      maxWinner: {
        type: Number,
        required: true,
      },

      currentWinner: {
        type: Number,
        default: 0,
      },
    })
  );
