const otpService = require('./otp-service');

exports.createOTP = async (req, res) => {
  try {
    const { phoneNumber, email } = req.body;
    const result = await otpService.generateOTP(phoneNumber, email);
    
    res.status(201).json({
      status: "Success",
      message: "OTP berhasil dibuat",
      data: result
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

exports.showOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const otpData = await otpService.getOTPStatus(phoneNumber);
    
    if (!otpData) {
      return res.status(404).json({ status: "Error", message: "OTP tidak ditemukan" });
    }

    res.status(200).json({ status: "Success", data: otpData });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};