const Joi = require('joi');

const sendOtp = {
  body: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

const verifyOtp = {
  body: Joi.object().keys({
    user_id: Joi.string().required(),
    otp: Joi.string().required(),
  }),
};

module.exports = {
  sendOtp,
  verifyOtp,
};
