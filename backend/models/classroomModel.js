import mongoose from "mongoose";

const classroomSchema = mongoose.Schema(
  {
    classroomName: {
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
    timestamp: true,
  }
);

const classroomModel = mongoose.model("Classroom", classroomSchema);
export default classroomModel;
