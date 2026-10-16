const express = require("express");

const authMiddleware = require("../../../middleware/authMiddleware");
const asyncHandler = require("../../../shared/errors/asyncHandler");
const { getMyProfile } = require("../controllers/userController");

const router = express.Router();

router.get(
  "/me",
  authMiddleware,
  asyncHandler(getMyProfile)
);

module.exports = router;
