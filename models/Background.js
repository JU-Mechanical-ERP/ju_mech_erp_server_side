import mongoose from "mongoose";

const academicBackgroundSchema = new mongoose.Schema({
  secondaryEducation: { marks: Number, year: Number },
  higherSecondaryEducation: { marks: Number, year: Number },
  mediumOfEducation: String,
  entranceExam: { rank: Number, year: Number }
});

export default academicBackgroundSchema;
