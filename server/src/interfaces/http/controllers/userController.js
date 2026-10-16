const User = require("../../../domain/users/User");
const AppError = require("../../../shared/errors/AppError");
const ERROR_CODES = require("../../../shared/errors/errorCodes");

const getMyProfile = async (req, res) => {
  const user = await User.findOne({
    _id: req.user.id,
    isActive: true,
  }).select("_id name email profilePicture about isVerified createdAt");

  if (!user) {
    throw new AppError(
      "User profile not found",
      404,
      ERROR_CODES.NOT_FOUND
    );
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        about: user.about,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    },
  });
};

module.exports = { getMyProfile };