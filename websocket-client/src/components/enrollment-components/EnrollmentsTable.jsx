import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingSkeleton from '../shared-components/LoadingSkeleton';
import { fetchAllEnrollments } from '../../features/enrollments/allEnrollmentsSlice';


const EnrollmentsTable = () => {
  const { enrollments, enrollmentsLoading, enrollmentsError } = useSelector(state => state.allEnrollments);
  const dispatch = useDispatch();

  if (enrollmentsLoading) return <LoadingSkeleton />;

  if (enrollmentsError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error fetching enrollments</div>
        <button
          onClick={() => dispatch(fetchAllEnrollments())}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!enrollments || enrollments.length === 0) {
    return <div className="text-center py-12 italic text-gray-500">No enrollments available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Enrolled At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {enrollments.map((enrollment) => (
            <tr key={enrollment._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{enrollment.studentEmail}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{enrollment.courseTitle}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(enrollment.enrolledAt).toLocaleString()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentsTable;