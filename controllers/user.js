import User from '../models/User.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv"
dotenv.config();
// Secret key for JWT (store this in an environment variable)
const JWT_SECRET = process.env.JWT; 

// Signup Controller
export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ "personalInfo.contactDetails.email": email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name: fullName,
            email,
            password: hashedPassword
        });

        // Save user to database
        const user= await newUser.save();

         // Generate JWT token
         const token = jwt.sign({ userId: user._id, email: email }, JWT_SECRET, {
            expiresIn: "1d" // Token valid for 1 day
        });

        res.status(201).json({token, user:user});

    } catch (error) {
        res.status(500).json({ success: false, message: "Error signing up", error: error.message });
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ "personalInfo.contactDetails.email": email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: email }, JWT_SECRET, {
            expiresIn: "1d" // Token valid for 1 day
        });

        res.status(200).json({token, user:user});

    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging in", error: error.message });
    }
};


// Controller function to add a new user
export const updateUser = async (req, res) => {
    try {
        const { email,
            personalInfo,
            enrollmentDetails,
            academicBackground,
            academicInfo,
            curricularInfo,
            careerProgression,
            miscellaneous
        } = req.body;

        let user=await User.findOne({email});

        user.personalInfo=personalInfo;
        user.enrollmentDetails=enrollmentDetails;
        user.academicBackground=academicBackground;
        user.academicInfo=academicInfo;
        user.curricularInfo=curricularInfo;
        user.careerProgression=careerProgression;
        user.miscellaneous=miscellaneous;
        
        // // Create a new user instance
        // const newUser = new User({
        //     personalInfo,
        //     enrollmentDetails,
        //     academicBackground,
        //     academicInfo,
        //     careerProgression,
        // });
        
        
        // Save user to database
        const newUser=await user.save();
        
        res.status(201).json({  user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
};
