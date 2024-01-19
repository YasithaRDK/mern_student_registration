import asyncHandler from "express-async-handler";
import Subject from "../models/subjectModel.js";

//Add new subject
export const addSubject = asyncHandler(async (req, res) => {
  const { subjectName } = req.body;

  if (!subjectName) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existSubjectName = await Subject.findOne({ subjectName });
  if (existSubjectName) {
    res.status(400);
    throw new Error("Subject Name exists");
  }

  await Subject.create({
    subjectName,
  });
  res.status(201).json("Record Created Successfully");
});

//Get all subject records
export const getAllSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.find({ status: "98" })
    .sort({ _id: -1 })
    .select("_id subjectName");
  res.status(200).json(subject);
});

//Get one subject record
export const getSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findById(id).select("_id subjectName");
  if (!subject) {
    res.status(404);
    throw new Error("Record not founded");
  }

  res.status(200).json(subject);
});

//Update subject record
export const updateSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { subjectName } = req.body;

  try {
    const subject = await Subject.findById(id);
    if (!subject) {
      res.status(404);
      throw new Error("Record not founded");
    }
    if (!subjectName) {
      res.status(400);
      throw new Error("All fields are required");
    }

    await Subject.findByIdAndUpdate(id, { subjectName }, { new: true });

    res.status(200).json("Record Updated Successfully");
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, handle accordingly
      res.status(400);
      throw new Error("Duplicate error: Subject Name already exists");
    } else {
      // Other errors, pass to the global error handler
      throw error;
    }
  }
});

//Delete subject record
export const deleteSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findById(id);
  if (!subject) {
    res.status(404);
    throw new Error("Record not founded");
  }
  await Subject.findByIdAndDelete(id);

  res.status(200).json("Record Deleted Successfully");
});
