import { configureStore } from '@reduxjs/toolkit';
import allCoursesReducer from '../features/courses/allCoursesSlice';
import allEnrollmentsReducer from '../features/enrollments/allEnrollmentsSlice';

const store = configureStore({
  reducer: {
    allCourses: allCoursesReducer,
    allEnrollments: allEnrollmentsReducer,
  }

});

export default store;
