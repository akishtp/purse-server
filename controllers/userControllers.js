const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

// user signup controller
const signupUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const user = await User.signup(name, password, email);
    const token = createToken(user._id);
    res
      .status(200)
      .json({ name, email: user.email, accounts: user.accounts, token });
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
    res
      .status(200)
      .json({ name, email: user.email, accounts: user.accounts, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

// user edit Controller
const updateUser = async (req, res) => {
  // const { _id } = req.body;
  // const user = await User.findById(_id);
  // if (!user) {
  //   throw Error("Could not find User");
  // }
  try {
    const user = await User.update(req);
    const token = createToken(user._id);
    res.status(200).json({
      user: user.name,
      email: user.email,
      accounts: user.accounts,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

module.exports = { signupUser, loginUser, updateUser };
