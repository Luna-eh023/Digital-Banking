module.exports = (db) =>
  db.model(
    'Transactions',
    db.Schema(
      {
        fromAccount: {
          type: db.Schema.Types.ObjectId,
          ref: 'Account',
          required: true,
        },
        toAccount: {
          type: db.Schema.Types.ObjectId,
          ref: 'Account',
          required: true,
        },

        fromAccountNumber: String,
        toAccountNumber: String,
        toName: String,

        amount: {
          type: Number,
          required: true,
        },

        fee: {
          type: Number,
          default: 0,
        },

        description: {
          type: String,
          default: '',
        },

        type: {
          type: String,
          enum: ['debit', 'credit'],
          required: true,
        },

        referenceNo: {
          type: String,
          required: true,
        },

        service: {
          type: String,
          default: 'BI FAST',
        },

        status: {
          type: String,
          default: 'success',
        },
      },
      {
        timestamps: true,
      }
    )
  );
