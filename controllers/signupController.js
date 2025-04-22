import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//? Importing the necessary models
import User from "../models/UserDetailsModel/User.js";
dotenv.config();
// Secret key for JWT (store this in an environment variable)
const JWT_SECRET = process.env.JWT;

//? Signup Controller
export const signup = async (req, res) => {
  try {
    //getting sign up details
    const { fullName, mobileNo, email, rollNumber, password } = req.body;
    //^ check if the user has provided all the required details
    if (!fullName || !mobileNo || !email || !rollNumber || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    //^ Check if the user already exists
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const personalInfo = {
      name: fullName,
      email: email,
    };
    const enrollmentDetails = {
      rollNumber: rollNumber,
    };
    const newUser = new User({
      name: fullName,
      mobileNo: mobileNo,
      email: email,
      rollNumber: rollNumber,
      password: hashedPassword,
      personalInfo: personalInfo,
      enrollmentDetails: enrollmentDetails,
    });

    // Save user to database
    const user = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: fullName, email: email },
      JWT_SECRET,
      {
        expiresIn: "1d", // Token valid for 1 day
      }
    );

    res.status(201).json({ token, user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error signing up",
      error: error.message,
    });
  }
};
