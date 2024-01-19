import asyncHandler from "express-async-handler";
import Teacher from "../models/teacherModel.js";

//Add new Teacher record
export const addTeacher = asyncHandler(async (req, res) => {
  const { firstName, lastName, contactNo, email } = req.body;

  if (!firstName || !lastName || !contactNo || !email) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existEmail = await Teacher.findOne({ email });
  if (existEmail) {
    res.status(400);
    throw new Error("Email already exists");
  }

  await Teacher.create({
    firstName,
    lastName,
    contactNo,
    email,
  });
  res.status(201).json("Record Created Successfully");
});

//Get all teacher records
export const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find({ status: "98" })
    .sort({ _id: -1 })
    .select("_id firstName lastName contactNo email");
  res.status(200).json(teachers);
});

//Get one teacher record
export const getTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const teacher = await Teacher.findById(id).select(
    "_id firstName lastName contactNo email"
  );

  if (!teacher) {
    res.status(404);
    throw new Error("Record not founded");
  }

  res.status(200).json(teacher);
});

//Update teacher record
export const updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, contactNo, email } = req.body;
  //check teacher available on database
  const teacher = await Teacher.findById(id);
  if (!teacher) {
    res.status(404);
    throw new Error("Record not founded");
  }

  if (!firstName || !lastName || !contactNo || !email) {
    res.status(400);
    throw new Error("All fields are required");
  }

  await Teacher.findByIdAndUpdate(
    id,
    { firstName, lastName, contactNo, email },
    { new: true }
  );
  res.status(200).json("Record Updated Successfully");
});

//Delete teacher record
export const deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const teacher = await Teacher.findById(id);
  if (!teacher) {
    res.status(404);
    throw new Error("Record not founded");
  }
  await Teacher.findByIdAndDelete(id);
  res.status(200).json("Record Deleted Successfully");
});
