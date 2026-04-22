const User = require('../../../models/user-model'); // Asumsi model User sudah ada

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

async function saveRefreshToken(userId, token) {
  // Simpan refresh token ke database untuk manajemen session
  return await Ufser.updateOne(
    { _id: userId },
    { $set: { refreshToken: token } }
  );
}

module.exports = { getUserByEmail, saveRefreshToken };
