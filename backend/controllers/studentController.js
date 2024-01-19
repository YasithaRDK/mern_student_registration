import asyncHandler from "express-async-handler";
import Student from "../models/StudentModel.js";
import mongoose from "mongoose";

//Add student record
export const addStudent = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    contactPerson,
    contactNo,
    email,
    birthDay,
    classroom,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !contactPerson ||
    !contactNo ||
    !email ||
    !birthDay ||
    !classroom
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existEmail = await Student.findOne({ email });
  if (existEmail) {
    res.status(400);
    throw new Error("Email already exists");
  }

  await Student.create({
    firstName,
    lastName,
    contactPerson,
    contactNo,
    email,
    birthDay,
    classroom,
  });

  res.status(201).json("Record Created Successfully");
});

//Get all student records
export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.aggregate([
    {
      $match: { status: "98" },
    },
    {
      $lookup: {
        from: "classrooms",
        localField: "classroom",
        foreignField: "_id",
        as: "classroomData",
      },
    },
    {
      $unwind: { path: "$classroomData", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        studentName: {
          $concat: ["$firstName", " ", "$lastName"],
        },
        contactPerson: "$contactPerson",
        contactNo: "$contactNo",
        email: "$email",
        birthDay: "$birthDay",
        classroom: "$classroomData.classroomName",
      },
    },
    {
      $sort: { _id: -1 },
    },
  ]);

  res.status(200).json(students);
});

//Get one student record
export const getSingleStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existStudent = await Student.findById(id);
  if (!existStudent) {
    res.status(404);
    throw new Error("Record not founded");
  }

  const student = await Student.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "classrooms",
        localField: "classroom",
        foreignField: "_id",
        as: "classroomData",
      },
    },
    {
      $unwind: { path: "$classroomData", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "aloclassrooms",
        localField: "classroom",
        foreignField: "classroom",
        as: "allocateClassroom",
      },
    },
    {
      $unwind: { path: "$allocateClassroom", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "teachers",
        localField: "allocateClassroom.teacher",
        foreignField: "_id",
        as: "teachersData",
      },
    },
    {
      $unwind: { path: "$teachersData", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "alosubjects",
        localField: "teachersData._id",
        foreignField: "teacher",
        as: "allocateSubject",
      },
    },
    {
      $unwind: { path: "$allocateSubject", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "subjects",
        localField: "allocateSubject.subject",
        foreignField: "_id",
        as: "subjectData",
      },
    },
    {
      $unwind: { path: "$subjectData", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        firstName: "$firstName",
        lastName: "$lastName",
        contactPerson: "$contactPerson",
        contactNo: "$contactNo",
        email: "$email",
        birthDay: "$birthDay",
        classroomId: "$classroom",
        classroom: "$classroomData.classroomName",
        teacher: {
          $concat: ["$teachersData.firstName", " ", "$teachersData.lastName"],
        },
        subject: "$subjectData.subjectName",
      },
    },
  ]);

  res.status(200).json(student);
});

//Update student record
export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    contactPerson,
    contactNo,
    email,
    birthDay,
    classroom,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !contactPerson ||
    !contactNo ||
    !email ||
    !birthDay ||
    !classroom
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existStudent = await Student.findById(id);
  if (!existStudent) {
    res.status(404);
    throw new Error("Record not founded");
  }

  try {
    await Student.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        contactPerson,
        contactNo,
        email,
        birthDay,
        classroom,
      },
      { new: true }
    );

    res.status(200).json("Record Updated Successfully");
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, handle accordingly
      res.status(400);
      throw new Error("Email already exists");
    } else {
      // Other errors, pass to the global error handler
      throw error;
    }
  }
});

//Delete student record
export const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existStudent = await Student.findById(id);
  if (!existStudent) {
    res.status(404);
    throw new Error("Record not founded");
  }

  await Student.findByIdAndDelete(id);

  res.status(200).json("Record Deleted Successfully");
});
