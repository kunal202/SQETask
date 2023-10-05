const { sendOtp, verifyOtp } = require('../../src/services/auth.service');
const User = require('../../src/models/user.model');
const Otp = require('../../src/models/otp.model');
const ApiError = require('../../src/utils/ApiError');

jest.mock('../../src/models/user.model');
jest.mock('../../src/models/otp.model');

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendOtp', () => {
    it('should throw an error if user is already registered', async () => {
      await User.findOne.mockResolvedValueOnce({});

      await expect(sendOtp('testUserId')).rejects.toThrow(ApiError);
      expect(User.findOne).toHaveBeenCalledWith({ user_id: 'testUserId', status: 'pending' });
    });

    it('should create a new user and otp if user is not registered', async () => {
      User.findOne.mockResolvedValueOnce(null);
      User.create.mockResolvedValueOnce({});
      Otp.create.mockResolvedValueOnce({});

      await expect(sendOtp('testUserId')).resolves.toBeDefined();
      expect(User.findOne).toHaveBeenCalledWith({ user_id: 'testUserId', status: 'pending' });
      expect(User.create).toHaveBeenCalledWith({ user_id: 'testUserId' });
      expect(Otp.create).toHaveBeenCalled();
    });
  });

  describe('verifyOtp', () => {
    it('should throw an error if user is not found', async () => {
      User.findOne.mockResolvedValueOnce(null);

      await expect(verifyOtp('testUserId', 'testOtp')).rejects.toThrow(ApiError);
      expect(User.findOne).toHaveBeenCalledWith({ user_id: 'testUserId', status: 'pending' });
    });

    it('should throw an error if otp is not found', async () => {
      User.findOne.mockResolvedValueOnce({});
      Otp.findOne.mockResolvedValueOnce(null);

      await expect(verifyOtp('testUserId', 'testOtp')).rejects.toThrow(ApiError);
      expect(User.findOne).toHaveBeenCalledWith({ user_id: 'testUserId', status: 'pending' });
      expect(Otp.findOne).toHaveBeenCalledWith({ otp: 'testOtp', user_id: 'testUserId', status: 'created' });
    });
  });
});
