import mongoose from "mongoose";

const allocateClassroomSchema = mongoose.Schema(
  {
    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "Teacher",
      required: true,
      trim: true,
    },
    classroom: {
      type: mongoose.Types.ObjectId,
      ref: "Classroom",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    autoCreate: false,
  }
);

allocateClassroomSchema.index({ teacher: 1, classroom: 1 }, { unique: true });

const allocateClassroomModel = mongoose.model(
  "AloClassroom",
  allocateClassroomSchema
);
export default allocateClassroomModel;
