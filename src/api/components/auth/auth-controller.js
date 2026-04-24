const service = require('./auth-service');

const login = async (req, res) => {
  try {
    const token = await service.login(
      req.body.email,
      req.body.password
    );

    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  login
};