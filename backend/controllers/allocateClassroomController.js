import asyncHandler from "express-async-handler";
import AllocateClassroom from "../models/allocateClassroomModel.js";
import Teacher from "../models/teacherModel.js";
import Classroom from "../models/classroomModel.js";

//Add new allocate classroom
export const addAllocateClassroom = asyncHandler(async (req, res) => {
  const { teacher, classroom } = req.body;

  try {
    if (!teacher || !classroom) {
      res.status(400);
      throw new Error("All fields are required");
    }
    //Check if the teacher and classroom are available in the database
    const teacherDetails = await Teacher.findById(teacher);
    const classroomDetails = await Classroom.findById(classroom);
    if (!teacherDetails || !classroomDetails) {
      res.status(400);
      throw new Error("Teacher or Classroom details not found");
    }
    //crate record
    await AllocateClassroom.create({
      teacher,
      classroom,
    });
    res.status(201).json("Record Created Successfully");
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, handle accordingly
      res.status(400);
      throw new Error(
        "Duplicate error: Teacher and Classroom combination already exists"
      );
    } else {
      // Other errors, pass to the global error handler
      throw error;
    }
  }
});

//Get all allocate classroom records
export const getAllAllocateClassroom = asyncHandler(async (req, res) => {
  const allocateClassroom = await AllocateClassroom.aggregate([
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
        from: "classrooms",
        localField: "classroom",
        foreignField: "_id",
        as: "classroom",
      },
    },
    {
      $unwind: { path: "$classroom", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        teacher: {
          $concat: ["$teacher.firstName", " ", "$teacher.lastName"],
        },
        classroom: "$classroom.classroomName",
      },
    },
    {
      $sort: { teacher: 1 },
    },
  ]);

  res.status(200).json(allocateClassroom);
});

//Delete allocate classroom record
export const deleteAllocateClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const allocateClassroom = await AllocateClassroom.findById(id);
  if (!allocateClassroom) {
    res.status(404);
    throw new Error("Record not founded");
  }

  await AllocateClassroom.findByIdAndDelete(id);

  res.status(200).json("Record Deleted Successfully");
});
