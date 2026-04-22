module.exports = (db) => {
  const transactionSchema = new db.Schema(
    {
      user: String,
      amount: Number,
      status: {
        type: String,
        enum: ['success', 'pending', 'failed'],
        default: 'pending',
      },
    },
    { timestamps: true }
  );

  return db.model('Transaction', transactionSchema);
};
