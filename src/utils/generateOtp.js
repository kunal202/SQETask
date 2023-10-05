function generateOtp() {
  const min = 10000; // Smallest 5-digit number
  const max = 99999; // Largest 5-digit number
  const otp = Math.floor(Math.random() * (max - min + 1) + min);
  return otp;
}

module.exports = {
  generateOtp,
};
