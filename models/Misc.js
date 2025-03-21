import mongoose from "mongoose";

const miscellaneousSchema = new mongoose.Schema({
  recommendations: [{ String }],
  learnings: String,
  statementOfPurpose: String,
  vision: String
});

export default miscellaneousSchema;
