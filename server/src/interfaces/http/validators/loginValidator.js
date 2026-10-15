const AppError = require("../../../shared/errors/AppError");
const ERROR_CODES = require("../../../shared/errors/errorCodes");

const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return next(
      new AppError(
        "Email and password are required",
        400,
        ERROR_CODES.VALIDATION_ERROR
      )
    );
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
  ) {
    return next(
      new AppError(
        "Please provide a valid email address",
        400,
        ERROR_CODES.VALIDATION_ERROR
      )
    );
  }

  if (password.length === 0 || password.length > 72) {
    return next(
      new AppError(
        "Invalid password",
        400,
        ERROR_CODES.VALIDATION_ERROR
      )
    );
  }

  req.body.email = normalizedEmail;

  next();
};

module.exports = { validateLogin };