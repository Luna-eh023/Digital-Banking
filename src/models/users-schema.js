module.exports = (db) => {
  const schema = new db.Schema({
    email: String,
    password: String,
    fullName: String,
  });

  return db.models.User || db.model('User', schema);
};