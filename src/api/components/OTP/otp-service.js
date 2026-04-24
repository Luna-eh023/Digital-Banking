const otpRepository = require('./otp-repository');

exports.generateOTP = async (phoneNumber, email) => {
  // Membuat 6 digit angka acak
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  await otpRepository.saveOTP(phoneNumber, email, otpCode);
  
  return { phoneNumber, otpCode }; // Biasanya dikirim via SMS/Email, tapi kita return dulu untuk test
};

exports.getOTPStatus = async (phoneNumber) => {
  return await otpRepository.findOTP(phoneNumber);
};