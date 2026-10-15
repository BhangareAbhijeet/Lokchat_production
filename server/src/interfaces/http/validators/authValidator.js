const AppError = require("../../../shared/errors/AppError");
const ERROR_CODES = require("../../../shared/errors/errorCodes");

const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return next(
      new AppError(
        "Name, email and password are required",
        400,
        ERROR_CODES.VALIDATION_ERROR
      )
    );
  }

  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedName.length < 2 || normalizedName.length > 50) {
    return next(
      new AppError(
        "Name must be between 2 and 50 characters",
        400,
        ERROR_CODES.VALIDATION_ERROR
      )
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(normalizedEmail)) {
    return next(
      new AppError(
        "Please provide a valid email address",
        400,
        ERROR_CODES.VALIDATION_ERROR
      )
    );
  }

  if (password.length < 8 || password.length > 72) {
    return next(
      new AppError(
        "Password must be between 8 and 72 characters",
        400,
        ERROR_CODES.VALIDATION_ERROR
      )
    );
  }

  req.body.name = normalizedName;
  req.body.email = normalizedEmail;

  next();
};

module.exports = { validateRegistration };