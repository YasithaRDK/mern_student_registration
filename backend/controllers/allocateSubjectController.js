import asyncHandler from "express-async-handler";
import AllocateSubject from "../models/allocateSubjectModel.js";
import Teacher from "../models/teacherModel.js";
import Subject from "../models/subjectModel.js";

//Add new allocate subject
export const addAllocateSubject = asyncHandler(async (req, res) => {
  const { teacher, subject } = req.body;
  try {
    if (!teacher || !subject) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const teacherDetails = await Teacher.findById(teacher);
    const subjectDetails = await Subject.findById(subject);
    if (!teacherDetails || !subjectDetails) {
      res.status(400);
      throw new Error("Teacher or Subject details not found");
    }

    await AllocateSubject.create({
      teacher,
      subject,
    });

    res.json("Record Created Successfully");
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, handle accordingly
      res.status(400).json({
        message:
          "Duplicate error: Teacher and Subject combination already exists",
      });
    } else {
      // Other errors, pass to the global error handler
      throw error;
    }
  }
});

//Get all allocate subject records
export const getAllAllocateSubject = asyncHandler(async (req, res) => {
  const allocateSubjects = await AllocateSubject.aggregate([
    {
      $lookup: {
        from: "teachers",
        localField: "teacher",
        foreignField: "_id",
        as: "teacher",
      },
    },
    {
      $unwind: { path: "$teacher", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "subjects",
        localField: "subject",
        foreignField: "_id",
        as: "subject",
      },
    },
    {
      $unwind: { path: "$subject", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        teacher: {
          $concat: ["$teacher.firstName", " ", "$teacher.lastName"],
        },
        subject: "$subject.subjectName",
      },
    },
    {
      $sort: { teacher: 1 },
    },
  ]);
  res.json(allocateSubjects);
});

//Delete allocate subject record
export const deleteAllocateSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const allocateSubject = await AllocateSubject.findById(id);
  if (!allocateSubject) {
    res.status(404);
    throw new Error("Record not founded");
  }
  await AllocateSubject.findByIdAndDelete(id);

  res.json("Record Deleted Successfully");
});
