import mongoose from "mongoose";

const careerProgressionSchema = new mongoose.Schema({
  placement: {
    placed: Boolean,
    offers: [
      { company: String, position: String, employmentType: String, mode: String, year: Number, package: Number, offerLetter: String }
    ],
    choiceOfOffer: String
  },
  competitiveExams: [{ examName: String, year: Number, score: Number, training: Boolean, result: String }],
  higherStudies: {
    programme: String,
    tenure: Number,
    institute: String,
    country: String
  },
  startups: [{ name: String, objective: String, investment: String, supportFromUniversity: Boolean }]
});

export default careerProgressionSchema;
