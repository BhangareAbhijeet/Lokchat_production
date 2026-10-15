const bcrypt = require("bcryptjs");
const User = require("../../domain/users/User");
const AppError = require("../../shared/errors/AppError");
const ERROR_CODES = require("../../shared/errors/errorCodes");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    throw new AppError(
      "An account with this email already exists",
      409,
      ERROR_CODES.CONFLICT
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      about: user.about,
      createdAt: user.createdAt,
    };
  } catch (error) {
    // Handle concurrent registrations for the same unique email.
    if (error.code === 11000) {
      throw new AppError(
        "An account with this email already exists",
        409,
        ERROR_CODES.CONFLICT
      );
    }

    throw error;
  }
};

module.exports = registerUser;