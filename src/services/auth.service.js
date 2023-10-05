const httpStatus = require('http-status');
const Otp = require('../models/otp.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { generateOtp } = require('../utils/generateOtp');

const isUserRegistered = async (userId) => {
  const userDoc = await User.findOne({ user_id: userId, status: 'pending' });
  return userDoc;
};

const createOtpDoc = async (userId) => {
  const otpNumber = generateOtp();
  const otpDoc = await Otp.create({ otp: otpNumber, user_id: userId });
  return otpDoc;
};

const createUser = async (userId) => {
  const userDoc = await User.create({ user_id: userId });
  if (!userDoc) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  return userDoc;
};

const sendOtp = async (userId) => {
  if (await isUserRegistered(userId)) {
    throw new ApiError(httpStatus.CONFLICT, {
      error: 'existing_user',
      error_description: 'User is already registered!',
    });
  }
  await createUser(userId);
  const response = await createOtpDoc(userId);
  return response;
};

const findCreatedOtp = async (userId, otp) => {
  const otpDoc = await Otp.findOne({ otp, user_id: userId, status: 'created' });
  if (!otpDoc) throw new ApiError(httpStatus.BAD_REQUEST, { error: 'otp_not_found', error_description: 'OTP Not Found' });
  return otpDoc;
};

const findPendingUser = async (userId) => {
  const userDoc = await User.findOne({ user_id: userId, status: 'pending' });
  if (!userDoc) throw new ApiError(httpStatus.NOT_FOUND, { error: 'user_not_found', error_description: 'User Not Found' });
  return userDoc;
};

const verifyOtp = async (userId, otp) => {
  const userDoc = await findPendingUser(userId);
  const otpDoc = await findCreatedOtp(userId, otp);

  const currentTime = otpDoc.createdAt;
  const expirationTime = new Date(currentTime.getTime() - 5 * 60 * 1000); // 5 minutes

  if (currentTime > expirationTime) {
    otpDoc.status = 'expired';
    await otpDoc.save();
    throw new ApiError(httpStatus.GONE, { error: 'expired_otp', error_description: 'OTP Is Expired' });
  }

  otpDoc.status = 'validated';
  userDoc.status = 'verified';
  await Promise.all([otpDoc.save(), userDoc.save()]);
};
module.exports = {
  verifyOtp,
  sendOtp,
};
