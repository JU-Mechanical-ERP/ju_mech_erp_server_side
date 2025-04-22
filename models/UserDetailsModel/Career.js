import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  company: String,
  position: String,
  employmentType: String,
  recruitmentType: String,
  year: String,
  package: String,
  accepted: Boolean,
  offerLetter: String, // Assuming it stores a file path or URL
});

const ExamSchema = new mongoose.Schema({
  name: String,
  year: String,
  score: String,
  rank: String,
  percentile: String,
  hasTraining: Boolean,
  trainingType: String,
  trainingMode: String,
  resultCard: String,
});

const HigherStudySchema = new mongoose.Schema({
  programme: String,
  duration: String,
  university: String,
  country: String,
});

const StartupSchema = new mongoose.Schema({
  hasStartup: Boolean,
  startupDetails: String,
  interestedInStartup: Boolean,
  universitySupport: String,
  externalSupport: String,
});

const careerProgressionSchema = new mongoose.Schema({
  placement: [OfferSchema],
  exams: [ExamSchema],
  higherStudy: HigherStudySchema,
  startup: StartupSchema,
});

export default careerProgressionSchema;
