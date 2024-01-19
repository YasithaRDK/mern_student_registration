import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, userRole } = req.body;

  if (!name || !email || !password || !userRole) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  await User.create({
    name,
    email,
    password: hashedPassword,
    userRole,
  });

  res.status(201).json("User registered successfully");
});

// @desc    Authenticate a user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userRole: user.userRole,
      token: generateToken(user._id, user.userRole),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Generate JWT
const generateToken = (id, userRole) => {
  return jwt.sign({ id, userRole }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
};
