import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import classroomService from "./classroomService";

const initialState = {
  classrooms: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  selectedClassroom: null,
};

// Get all classrooms
export const getClassrooms = createAsyncThunk(
  "classrooms/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await classroomService.getClassrooms(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single classroom
export const getClassroom = createAsyncThunk(
  "classrooms/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await classroomService.getClassroom(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new classroom
export const createClassroom = createAsyncThunk(
  "classrooms/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await classroomService.createClassroom(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update classroom
export const updateClassroom = createAsyncThunk(
  "classrooms/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await classroomService.updateClassroom(id, data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete classroom
export const deleteClassroom = createAsyncThunk(
  "classrooms/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await classroomService.deleteClassroom(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClassrooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassrooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classrooms = action.payload;
      })
      .addCase(getClassrooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClassroom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassroom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedClassroom = action.payload;
      })
      .addCase(getClassroom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createClassroom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClassroom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classrooms.push(action.payload);
      })
      .addCase(createClassroom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateClassroom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateClassroom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedIndex = state.classrooms.findIndex(
          (classroom) => classroom._id === action.payload._id
        );
        if (updatedIndex !== -1) {
          state.classrooms[updatedIndex] = action.payload;
        }
      })
      .addCase(updateClassroom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteClassroom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClassroom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classroom = state.classrooms.filter(
          (classroom) => classroom._id !== action.payload.id
        );
      })
      .addCase(deleteClassroom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = classroomSlice.actions;
export default classroomSlice.reducer;
