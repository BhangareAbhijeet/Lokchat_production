const ERROR_CODES = require("../shared/errors/errorCodes");

const errorHandler = (err, req, res, next) => {
  const statusCode = Number.isInteger(err.statusCode)
    ? err.statusCode
    : 500;

  const isProduction = process.env.NODE_ENV === "production";

  const response = {
    success: false,
    error: {
      code:
        err.errorCode ||
        (statusCode === 500
          ? ERROR_CODES.INTERNAL_ERROR
          : ERROR_CODES.VALIDATION_ERROR),
      message:
        statusCode >= 500 && isProduction
          ? "Internal server error"
          : err.message || "Something went wrong",
    },
  };

  if (!isProduction && err.stack) {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;