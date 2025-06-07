import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAllEnrollments } from '../../features/enrollments/allEnrollmentsSlice';
import { fetchAllCourses } from '../../features/courses/allCoursesSlice';
import StatsCards from './StatsCards';
import CoursesTable from '../courses-components/CoursesTable';
import EnrollmentsTable from '../enrollment-components/EnrollmentsTable';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    dispatch(fetchAllEnrollments());
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <StatsCards />

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-2 ${activeTab === 'courses' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('courses')}
          >
            All Courses
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'enrollments' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('enrollments')}
          >
            All Enrollments
          </button>
        </div>

        {activeTab === 'courses' ? <CoursesTable /> : <EnrollmentsTable />}
      </div>
    </div>
  );
};

export default Dashboard;