import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  gender: String,
  category: String,
  isPwd: Boolean,
  mobileNo: String,
  whatsappNo: String,
  email: String,
  alternateEmail: String,
  presentAddress: String,
  presentState: String,
  permanentAddress: String,
  permanentState: String,
  emergencyContactName: String,
  emergencyContactNumber: String,
  emergencyContactRelation: String,
  nationality: String,
  idType: String,
  idNumber: String,
  familyIncome: String,
});

export default personalInfoSchema;
