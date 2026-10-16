const jwt = require("jsonwebtoken");
const User = require("../domain/users/User");
const AppError = require("../shared/errors/AppError");
const ERROR_CODES = require("../shared/errors/errorCodes");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Authentication token is required",
        401,
        ERROR_CODES.UNAUTHORIZED
      );
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      throw new AppError(
        "Authentication token is required",
        401,
        ERROR_CODES.UNAUTHORIZED
      );
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, jwtSecret, {
      issuer: "lokchat-api",
      audience: "lokchat-client",
    });

    if (!decoded.sub) {
      throw new AppError(
        "Invalid authentication token",
        401,
        ERROR_CODES.UNAUTHORIZED
      );
    }

    const user = await User.findOne({
      _id: decoded.sub,
      isActive: true,
    }).select("_id name email profilePicture about");

    if (!user) {
      throw new AppError(
        "User account not found or inactive",
        401,
        ERROR_CODES.UNAUTHORIZED
      );
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError" ||
      error.name === "CastError"
    ) {
      return next(
        new AppError(
          "Invalid or expired authentication token",
          401,
          ERROR_CODES.UNAUTHORIZED
        )
      );
    }

    next(error);
  }
};

module.exports = authMiddleware;
