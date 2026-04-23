module.exports = (mongoose) => {
  const accountSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    balance: { type: Number, default: 0 },
  });

  return mongoose.model('Account', accountSchema);
};
