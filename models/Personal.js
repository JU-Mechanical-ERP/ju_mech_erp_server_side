import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: Date,
  gender: String,
  category: String,
  differentlyAbled: Boolean,
  contactDetails: {
    mobileNo: String,
    whatsappNo: String,
    email: String,
    alternateEmail: String
  },
  address: {
    present: String,
    permanent: String,
    state: String
  },
  emergencyContacts: [{ name: String, relation: String, phone: String }],
  nationality: String,
  identification: { aadhar: String, passport: String },
  familyIncome: Number
});

export default personalInfoSchema;
