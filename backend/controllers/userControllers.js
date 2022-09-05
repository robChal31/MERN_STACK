const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "31d" });
};

const login = async (req, res) => {
  try {
    const user = await User.login(req, res);
    const token = createToken(user._id);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const signup = async (req, res) => {
  try {
    const newUser = await User.signup(req, res);
    const token = createToken(newUser._id);
    res.status(200).json({
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { login, signup, getUser };
