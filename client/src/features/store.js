import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import studentReducer from "./student/studentSlice";
import classroomReducer from "./classroom/classroomSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    classrooms: classroomReducer,
  },
});
