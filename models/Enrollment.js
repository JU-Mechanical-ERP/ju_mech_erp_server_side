import mongoose from "mongoose";

const enrollmentDetailsSchema = new mongoose.Schema({
  rollNumber: String,
  section: String,
  programme: String,
  isLateralEntry: Boolean,
  admissionYear: String,
  currentSemester: String,
  currentYear: String,
  expectedGraduationYear: String,
  registrationNumber: String,
  registrationYear: String,
  mentorName: String,
  hasScholarship: Boolean,
  scholarshipDetails: String,
});

export default enrollmentDetailsSchema;
