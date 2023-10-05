class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super();
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.message = message;
  }
}

module.exports = ApiError;
