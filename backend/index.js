import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import studentRouter from "./routes/studentRoute.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorMiddleware,js";
import classroomRouter from "./routes/classroomRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";
import subjectRouter from "./routes/subjectRoutes.js";
import allocateClassroomRouter from "./routes/allocateClassroomRoutes.js";
import allocateSubjectRouter from "./routes/allocateSubjectRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: "https://mern-student-registration.vercel.app",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/students", studentRouter);
app.use("/api/classrooms", classroomRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/allocate-classrooms", allocateClassroomRouter);
app.use("/api/allocate-subjects", allocateSubjectRouter);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));
