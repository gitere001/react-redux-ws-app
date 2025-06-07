import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { fetchAllCourses } from '../../features/courses/allCoursesSlice';
import LoadingSkeleton from '../shared-components/LoadingSkeleton';

const CoursesTable = () => {
  const { courses, coursesLoading, coursesError } = useSelector(state => state.allCourses);
  const dispatch = useDispatch();

  if (coursesLoading) return <LoadingSkeleton />;

  if (coursesError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error fetching courses</div>
        <button
          onClick={() => dispatch(fetchAllCourses())}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return <div className="text-center py-12 italic text-gray-500">No courses available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{course.title}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500 line-clamp-2">{course.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(course.createdAt).toLocaleDateString()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;