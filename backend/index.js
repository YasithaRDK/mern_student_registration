import express from "express";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRoute.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorMiddleware,js";
import classroomRouter from "./routes/classroomRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";
import subjectRouter from "./routes/subjectRoutes.js";
import allocateClassroomRouter from "./routes/allocateClassroomRoutes.js";
import allocateSubjectRouter from "./routes/allocateSubjectRoutes.js";
import userRouter from "./routes/userRoutes.js";
import path from "path";

dotenv.config();

const port = process.env.PORT;

const __dirname = path.resolve();

const app = express();

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

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use(errorHandler);

connectDB()
  .then(() =>
    app.listen(port, () => console.log(`Server started on port: ${port}`))
  )
  .catch((error) => console.log(error.message));
