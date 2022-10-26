const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// user signup controller
const signupUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const user = await User.signup(name, password, email);
    const token = createToken(user._id);
    res.status(200).json({ name, email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

// user login controller
const loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.login(name, password);
    const token = createToken(user._id);
    res.status(200).json({ name, email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

module.exports = { signupUser, loginUser };
