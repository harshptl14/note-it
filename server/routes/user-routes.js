const express = require("express");
const User = require("../models/user");
const router = express.Router();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.userExists(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await User.login(email, password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = require("crypto").randomBytes(64).toString("hex");
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.userExists(email);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await User.register(email, password, username);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

router.post("/login", async (req, res) => {
  login(req, res);
});

router.post("/register", async (req, res) => {
  register(req, res);
});

module.exports = router;
