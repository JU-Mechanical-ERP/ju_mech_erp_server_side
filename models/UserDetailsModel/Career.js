import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  company: String,
  position: String,
  employmentType: String,
  recruitmentType: String,
  year: String,
  package: String,
  offerLetter: String, // Assuming it stores a file path or URL
});

const ExamSchema = new mongoose.Schema({
  name: String,
  year: String,
  score: String,
  hasTraining: Boolean,
  trainingType: String,
  trainingMode: String,
  resultCard: String,
});

const HigherStudySchema = new mongoose.Schema({
  programme: String,
  duration: String,
  institute: String,
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
  placement: {
    isPlaced: Boolean,
    offers: [OfferSchema],
    choiceDetails: String,
  },
  exams: [ExamSchema],
  higherStudy: HigherStudySchema,
  startup: StartupSchema,
});

export default careerProgressionSchema;
