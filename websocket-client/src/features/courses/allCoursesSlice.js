import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk to fetch all courses
export const fetchAllCourses = createAsyncThunk(
  'courses/fetchAllCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/courses`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const allCoursesSlice = createSlice({
  name: 'allCourses',
  initialState: {
    coursesLoading: false,
    coursesError: null,
    courses: [],
  },
  reducers: {
    resetAllCoursesState: (state) => {
      state.coursesLoading = false;
      state.coursesError = null;
      state.courses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.coursesLoading = true;
        state.coursesError = null;
        state.courses = [];
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.coursesLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.coursesLoading = false;
        state.coursesError = action.payload;
      });
  },
});

export const { resetAllCoursesState } = allCoursesSlice.actions;
export default allCoursesSlice.reducer;
