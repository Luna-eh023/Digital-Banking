'const userService = require('./user-service');

async function changePIN(req, res) {
  try {
    const { userId, oldPin, newPin, otp } = req.body;

    if (!userId || !oldPin || !newPin || !otp) {
      return res.status(400).json({
        status: "error",
        message: "All fields required"
      });
    }

    const result = await userService.changePIN(userId, oldPin, newPin, otp);

    res.json({
      status: "success",
      data: result
    });

  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message
    });
  }
}

module.exports = { changePIN };