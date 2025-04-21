import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//? Importing the necessary models
import User from "../models/UserDetailsModel/User.js";
import Request from "../models/UserDetailsModel/Request.js";
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

//? Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //^ Find the user by email
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    //^ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: email },
      JWT_SECRET,
      {
        expiresIn: "1d", // Token valid for 1 day
      }
    );

    res.status(200).json({ token, user: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};

//? get primary user details
export const getPrimaryUserDetails = async (req, res) => {
  try {
    //?getting the token from the request header
    const token = req.headers.authorization.split(" ")[1]; // Extracting the token from the request header
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    //^ Verify & decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId; // Extracting the user ID from the token
    const email = decoded.email; // Extracting the email from the token

    // Find the user by ID and select only the required fields
    const user = await User.findById(userId).select(
      "name email mobileNo rollNumber personalInfo enrollmentDetails academicBackground academicInfo curricularInfo careerProgression miscellaneous"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.email !== email) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to add a new user
export const updateUser = async (req, res) => {
  try {
    const {
      email,
      personalInfo,
      enrollmentDetails,
      academicBackground,
      academicInfo,
      curricularInfo,
      careerProgression,
      miscellaneous,
    } = req.body;

    let user = await User.findOne({ email });

    user.personalInfo = personalInfo;
    user.enrollmentDetails = enrollmentDetails;
    user.academicBackground = academicBackground;
    user.academicInfo = academicInfo;
    user.curricularInfo = curricularInfo;
    user.careerProgression = careerProgression;
    user.miscellaneous = miscellaneous;

    const newUser = await user.save();

    res.status(201).json({ user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add user", details: error.message });
  }
};

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
