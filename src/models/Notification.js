module.exports = (mongoose) => {
  const schema = new mongoose.Schema({
    name: String,
  });

  return mongoose.model('User', schema);
};
