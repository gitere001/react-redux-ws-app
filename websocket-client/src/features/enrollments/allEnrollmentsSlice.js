import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Async thunk to fetch all enrollments
export const fetchAllEnrollments = createAsyncThunk(
  'enrollments/fetchAllEnrollments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/students`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const allEnrollmentsSlice = createSlice({
  name: 'allEnrollments',
  initialState: {
    enrollmentsLoading: false,
    enrollmentsError: null,
    enrollments: [],
  },
  reducers: {
    resetAllEnrollmentsState: (state) => {
      state.enrollmentsLoading = false;
      state.enrollmentsError = null;
      state.enrollments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEnrollments.pending, (state) => {
        state.enrollmentsLoading = true;
        state.enrollmentsError = null;
        state.enrollments = [];
      })
      .addCase(fetchAllEnrollments.fulfilled, (state, action) => {
        state.enrollmentsLoading = false;
        state.enrollments = action.payload;
      })
      .addCase(fetchAllEnrollments.rejected, (state, action) => {
        state.enrollmentsLoading = false;
        state.enrollmentsError = action.payload;
      });
  },
});

export const { resetAllEnrollmentsState } = allEnrollmentsSlice.actions;
export default allEnrollmentsSlice.reducer;
