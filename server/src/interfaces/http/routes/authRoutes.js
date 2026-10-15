const express = require("express");

const {
  register,
  login,
} = require("../controllers/authController");

const {
  validateRegistration,
} = require("../validators/authValidator");

const {
  validateLogin,
} = require("../validators/loginValidator");

const asyncHandler = require("../../../shared/errors/asyncHandler");

const router = express.Router();

router.post(
  "/register",
  validateRegistration,
  asyncHandler(register)
);

router.post(
  "/login",
  validateLogin,
  asyncHandler(login)
);

module.exports = router;