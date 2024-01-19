import asyncHandler from "express-async-handler";
import Classroom from "../models/classroomModel.js";

//Add new classroom
export const addClassroom = asyncHandler(async (req, res) => {
  const { classroomName } = req.body;

  if (!classroomName) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existClassName = await Classroom.findOne({ classroomName });
  if (existClassName) {
    res.status(400);
    throw new Error("Classroom already exists");
  }

  await Classroom.create({
    classroomName,
  });
  res.status(201).json("Record Created Successfully");
});

//Get all classroom records
export const getAllClassroom = asyncHandler(async (req, res) => {
  const classrooms = await Classroom.find({ status: "98" }).select(
    "classroomName _id"
  );

  classrooms.sort((a, b) => {
    const gradeA = extractGradeParts(a.classroomName);
    const gradeB = extractGradeParts(b.classroomName);

    // First, compare the numeric part
    if (gradeA.number !== gradeB.number) {
      return gradeA.number - gradeB.number;
    }

    // If the numeric part is the same, compare the alphanumeric part
    return gradeA.alpha.localeCompare(gradeB.alpha);
  });

  res.status(200).json(classrooms);
});

// Function to extract numeric and alphanumeric parts of the grade
function extractGradeParts(grade) {
  const match = grade.match(/(\d+)([A-Za-z]+)/);
  if (match) {
    const [, number, alpha] = match;
    return { number: parseInt(number, 10), alpha };
  }
  // Default values if the grade doesn't match the expected pattern
  return { number: 0, alpha: grade };
}

//Get one classroom record
export const getClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const classroom = await Classroom.findById(id).select("classroomName _id");
  if (!classroom) {
    res.status(404);
    throw new Error("Record not founded");
  }

  res.status(200).json(classroom);
});

//Update classroom record
export const updateClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { classroomName } = req.body;

  try {
    const classroom = await Classroom.findById(id);
    if (!classroom) {
      res.status(404);
      throw new Error("Record not founded");
    }

    if (!classroomName) {
      res.status(400);
      throw new Error("All fields are required");
    }

    await Classroom.findByIdAndUpdate(id, { classroomName }, { new: true });

    res.status(200).json("Record Updated Successfully");
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, handle accordingly
      res.status(400);
      throw new Error("Duplicate error: Classroom Name already exists");
    } else {
      // Other errors, pass to the global error handler
      throw error;
    }
  }
});

//Delete classroom record
export const deleteClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check record available on database
  const classroom = await Classroom.findById(id);
  if (!classroom) {
    res.status(404);
    throw new Error("Record not founded");
  }
  await Classroom.findByIdAndDelete(id);
  res.status(200).json("Record Deleted Successfully");
});
