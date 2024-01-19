import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: "98",
    },
  },
  {
    timestamps: true,
    autoCreate: false,
  }
);

const subjectModel = mongoose.model("Subject", subjectSchema);
export default subjectModel;
