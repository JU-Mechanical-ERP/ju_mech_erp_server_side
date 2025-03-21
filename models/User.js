import mongoose from "mongoose";
import personalInfoSchema from "./Personal.js";
import enrollmentDetailsSchema from "./Enrollment.js";
import academicBackgroundSchema from "./Background.js";
import academicInfoSchema from "./Academicinfo.js";
import careerProgressionSchema from "./career.js";
import miscellaneousSchema from "./misc.js";

const userSchema = new mongoose.Schema(
  {
    personalInfo: personalInfoSchema,
    enrollmentDetails: enrollmentDetailsSchema,
    academicBackground: academicBackgroundSchema,
    academicInfo: academicInfoSchema,
    careerProgression: careerProgressionSchema,
    miscellaneous: miscellaneousSchema
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
