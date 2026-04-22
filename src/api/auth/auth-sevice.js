const repo = require('./auth-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function login(email, password) {
  const user = await repo.getUserByEmail(email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  // Generate Access Token (OIDC Style)
  const accessToken = jwt.sign(
    { sub: user._id, email: user.email, role: 'customer' },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign({ sub: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: '7d',
  });
  await repo.saveRefreshToken(user._id, refreshToken);

  return { accessToken, refreshToken };
}

module.exports = { login };
