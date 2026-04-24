module.exports = (mongoose) => {
  const transactionSchema = new mongoose.Schema(
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

  return mongoose.model('Transaction', transactionSchema);
};
