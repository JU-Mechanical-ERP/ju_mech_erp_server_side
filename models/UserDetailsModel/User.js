import mongoose from "mongoose";
//? importing schemas for the over userSchema
import personalInfoSchema from "./Personal.js";
import enrollmentDetailsSchema from "./Enrollment.js";
import academicBackgroundSchema from "./Background.js";
import academicInfoSchema from "./Academicinfo.js";
import careerProgressionSchema from "./Career.js";
import miscellaneousSchema from "./Misc.js";
import CoCurricularSchema from "./Curricular.js";

//? overall schema of the user
const userSchema = new mongoose.Schema(
  {
    name: String,
    mobileNo: String,
    email: String,
    rollNumber: String,
    password: String,
    personalInfo: personalInfoSchema,
    enrollmentDetails: enrollmentDetailsSchema,
    academicBackground: academicBackgroundSchema,
    academicInfo: academicInfoSchema,
    curricularInfo: CoCurricularSchema,
    careerProgression: careerProgressionSchema,
    miscellaneous: miscellaneousSchema,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "student_details");
export default User;
