module.exports = (db) =>
  db.model(
    'Users',
    db.Schema({
      email: String,

      password: String,

      fullName: String,

      gachaCount: {
        type: Number,
        default: 0,
      },

      lastGachaDate: {
        type: Date,
        default: null,
      },
    })
  );
