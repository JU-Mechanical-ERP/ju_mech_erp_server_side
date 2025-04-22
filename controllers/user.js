import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//? Importing the necessary models
import User from "../models/UserDetailsModel/User.js";
import Request from "../models/UserDetailsModel/Request.js";
dotenv.config();
// Secret key for JWT (store this in an environment variable)
const JWT_SECRET = process.env.JWT;

export const createreq = async (req, res) => {
  try {
    const { user_id, fullName, requestDetails, shortWriteup } = req.body;

    // Validate required fields
    if (!user_id || !fullName || !requestDetails || !shortWriteup) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new request document
    const newRequest = new Request({
      user_id,
      fullName,
      requestDetails,
      shortWriteup,
    });

    // Save to database
    await newRequest.save();

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserRequests = async (req, res) => {
  try {
    const { user_id } = req.body;
    //console.log(user_id)
    // Validate user_id
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch all requests for the given user_id
    const requests = await Request.find({ user_id });
    console.log(requests);
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};
