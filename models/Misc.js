import mongoose from "mongoose";

const miscellaneousSchema = new mongoose.Schema({
  lor: String,
  keyLearnings: String,
  sop: String,
  vision: String,
});

export default miscellaneousSchema;
