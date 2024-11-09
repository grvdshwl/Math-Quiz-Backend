require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const signUpService = async (email, password, name) => {
  try {
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    return { ...newUser.toObject() };
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Error during signup");
  }
};

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return { ...user };
  } catch (error) {
    throw error;
  }
};

const getUserDetailsByEmail = async (email) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email }).lean();

    // If user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // Return user details (exclude sensitive fields like password)
    const { password, ...userDetails } = user; // Destructure to exclude password

    return userDetails;
  } catch (error) {
    throw error; // Propagate error to be handled by the controller
  }
};

module.exports = { signUpService, loginService, getUserDetailsByEmail };
