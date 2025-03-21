import User from '../models/User.js';

// Controller function to add a new user
export const addUser = async (req, res) => {
    try {
        const { personalInfo,
            enrollmentDetails,
            academicBackground,
            academicInfo,
            careerProgression,
            
        } = req.body;
        
        // Create a new user instance
        const newUser = new User({
            personalInfo,
            enrollmentDetails,
            academicBackground,
            academicInfo,
            careerProgression,
        });
        
        // Save user to database
        await newUser.save();
        
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
};
