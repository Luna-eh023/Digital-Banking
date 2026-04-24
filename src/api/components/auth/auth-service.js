const jwt = require('jsonwebtoken');
const { User } = require('../../../models');

const login = async (email, password) => {
  // Validasi input
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Ambil user dari database
  const user = await User.findOne({ email }).lean();

  if (!user) {
    throw new Error('User not found');
  }

  // Debug (lihat di terminal)
  console.log("USER DATA:", user);
  console.log("INPUT PASSWORD:", password);

  // Validasi password ada di database
  if (!user.password) {
    throw new Error('Password not found in DB');
  }

  // Validasi password
  if (String(password).trim() !== String(user.password).trim()) {
    throw new Error('Wrong password');
  }

  // Generate token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    'SECRET_KEY',
    { expiresIn: '1h' }
  );

  return token;
};

module.exports = {
  login
};