const service = require('./auth-service');

async function postLogin(req, res) {
  try {
    const { email, password } = req.body;
    const tokens = await service.login(email, password);
    return res.status(200).json({ message: 'Login Success', ...tokens });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

module.exports = { postLogin };
