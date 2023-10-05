const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');

const sendOtp = catchAsync(async (req, res) => {
  const otpDoc = await authService.sendOtp(req.body.user_id);
  res.status(httpStatus.CREATED).send({
    user_id: otpDoc.user_id,
    otp: otpDoc.otp,
  });
});

const verifyOtp = catchAsync(async (req, res) => {
  await authService.verifyOtp(req.body.user_id, req.body.otp);
  res.status(httpStatus.OK).send({
    user_id: req.body.user_id,
    message: 'OTP validated successfully.',
  });
});

module.exports = {
  sendOtp,
  verifyOtp,
};
