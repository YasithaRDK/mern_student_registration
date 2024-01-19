import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    birthDay: {
      type: Date,
      required: true,
      trim: true,
    },
    classroom: {
      type: mongoose.Types.ObjectId,
      ref: "Classroom",
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: "98",
    },
  },
  {
    timestamp: true,
  }
);

studentSchema.index({ email: 1 }, { unique: true });

const studentModel = mongoose.model("Student", studentSchema);
export default studentModel;
