const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET_KEY } = process.env;

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Validation error" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashPassword });
    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Validation error" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.logout = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).end();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
exports.current = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
    } else {
      res.status(200).json({
        email: user.email,
        subscription: user.subscription,
      });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
