const axios = require("axios");
const User = require("../../models/user"); // adjust path

async function changePIN(userId, oldPin, newPin, otp) {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  // 1. check old pin
  if (user.pin !== oldPin) {
    throw new Error("Old PIN incorrect");
  }

  // 2. verify OTP (call Bunga API)
  const otpRes = await axios.post("http://localhost:5000/api/otp/verify", {
    phone: user.phone,
    otp
  });

  if (!otpRes.data.valid) {
    throw new Error("Invalid OTP");
  }

  // 3. update PIN
  user.pin = newPin;
  await user.save();

  // 4. send notification (call YOUR SMS API)
  await axios.post("http://localhost:5000/api/notifications/sms", {
    phone: user.phone,
    message: "PIN berhasil diubah",
    type: "SECURITY"
  });

  return {
    message: "PIN changed successfully"
  };
}

module.exports = { changePIN };