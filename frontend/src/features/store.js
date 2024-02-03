import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import classroomsReducer from "./classrooms/classroomsSlice";
import studentsReducer from "./students/studentsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    classrooms: classroomsReducer,
  },
});
