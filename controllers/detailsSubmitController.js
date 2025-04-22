import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//? Importing the necessary models
import User from "../models/UserDetailsModel/User.js";
dotenv.config();
// Secret key for JWT (store this in an environment variable)
const JWT_SECRET = process.env.JWT;

export const detailsSubmit = async (req, res) => {
  try {
    const {
      personalInfo,
      enrollmentDetails,
      academicBackground,
      academicInfo,
      curricularInfo,
      careerProgression,
      miscellaneous,
    } = req.body;

    // console.log("Request Body:", req.body); // Debugging: Log the incoming data

    let user = await User.findOne({ email: personalInfo.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details
    user.personalInfo = personalInfo || {};
    user.enrollmentDetails = enrollmentDetails || {};
    user.academicBackground = academicBackground || {};
    user.academicInfo = academicInfo || {};
    user.curricularInfo = curricularInfo || {};
    user.careerProgression = careerProgression || {};
    user.miscellaneous = miscellaneous || {};

    // console.log("User object before saving:", user); // Debugging: Log the user object

    // Save the updated user
    try {
      const userUpdated = await user.save();
      // console.log("User details updated successfully:", userUpdated);
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error saving user:", error);
      res
        .status(500)
        .json({ error: "Failed to save user", details: error.message });
    }
  } catch (error) {
    console.error("Error in detailsSubmit:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
