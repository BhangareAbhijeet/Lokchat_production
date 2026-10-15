const AppError = require("../shared/errors/AppError");
const ERROR_CODES = require("../shared/errors/errorCodes");

const notFoundHandler = (req, res, next) => {
  next(
    new AppError(
      `Route not found: ${req.method} ${req.originalUrl}`,
      404,
      ERROR_CODES.NOT_FOUND
    )
  );
};

module.exports = notFoundHandler;