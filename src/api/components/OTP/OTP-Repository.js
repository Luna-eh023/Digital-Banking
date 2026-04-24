const OTP = require('../../../models/OTP-Schema');

exports.saveOTP = async (phoneNumber, email, otpCode) => {
  const newOtp = new OTP({ phoneNumber, email, otpCode });
  return await newOtp.save();
};

exports.findOTP = async (phoneNumber) =>
  // Mencari OTP terbaru untuk nomor telepon tersebut
  await OTP.findOne({ phoneNumber }).sort({ createdAt: -1 });
