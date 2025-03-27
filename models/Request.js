import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    requestDetails: {
      type: String,
      required: true,
      trim: true,
    },
    shortWriteup: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
