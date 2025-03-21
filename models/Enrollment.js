import mongoose from "mongoose";

const enrollmentDetailsSchema = new mongoose.Schema({
  rollNumber: String,
  section: String,
  programme: String,
  lateralEntry: Boolean,
  yearOfAdmission: Number,
  currentSemester: Number,
  currentYear: Number,
  expectedGraduationYear: Number,
  registrationNumber: String,
  Year: String,
  mentorName: String,
  scholarshipDetails: String
});

export default enrollmentDetailsSchema;
