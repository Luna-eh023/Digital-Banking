module.exports = (mongoose) => {
  const transactionSchema = new mongoose.Schema(
    {
      fromAccount: {
        type: String,
        required: true
      },
      toAccount: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ['success', 'pending', 'failed'],
        default: 'success'
      }
    },
    { timestamps: true }
  );

  return mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
};