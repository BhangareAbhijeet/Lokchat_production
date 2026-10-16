const registerUser = require("../../../domain/auth/registerUser");
const loginUser = require("../../../domain/auth/loginUser");

const register = async (req, res) => {
  const user = await registerUser(req.body);

  return res.status(201).json({
    success: true,
    message: "Registration successful",
    data: user,
  });
};

const login = async (req, res) => {
  const result = await loginUser({
    email: req.body.email,
    password: req.body.password,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

module.exports = {
  register,
  login,
};