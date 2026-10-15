const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../users/User");
const AppError = require("../../shared/errors/AppError");
const ERROR_CODES = require("../../shared/errors/errorCodes");

const loginUser = async ({ email, password }) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
    isActive: true,
  }).select("+passwordHash");

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401,
      ERROR_CODES.UNAUTHORIZED
    );
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    throw new AppError(
      "Invalid email or password",
      401,
      ERROR_CODES.UNAUTHORIZED
    );
  }

  const token = jwt.sign(
    {
      sub: user._id.toString(),
    },
    jwtSecret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      issuer: "lokchat-api",
      audience: "lokchat-client",
    }
  );

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      about: user.about,
    },
  };
};

module.exports = loginUser;