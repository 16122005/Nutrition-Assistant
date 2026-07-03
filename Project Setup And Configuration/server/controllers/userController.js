const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// User Login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt for:", email); // Added for debugging

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: User not found");
      return res.status(401).json({ error: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login failed: Invalid credentials");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "your_fallback_secret", // Added fallback
      { expiresIn: "1d" }
    );

    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error("Login server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User Registration
const userRegister = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  console.log("Registering:", email);

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    res.status(201).json({ 
      message: "Account created", 
      user: { id: user._id, name, email, isAdmin: user.isAdmin } 
    });
  } catch (error) {
    console.error("Register server error:", error);
    res.status(500).json({ error: "Failed to register" });
  }
};

module.exports = {
  userLogin,
  userRegister
};