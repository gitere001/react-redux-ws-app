import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllCourses } from './features/courses/allCoursesSlice';
import { fetchAllEnrollments } from './features/enrollments/allEnrollmentsSlice';
import Dashboard from './components/shared-components/Dashboard';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_SOCKET_URL);

    ws.onopen = () => {
      console.log('✅ Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('📩 Message from server:', data);

      // Handle events
      if (data.type === 'NEW_COURSE_ADDED') {
        dispatch(fetchAllCourses());
      }

      if (data.type === 'NEW_ENROLLMENT_ADDED') {
        dispatch(fetchAllEnrollments());
      }
    };

    ws.onclose = () => {
      console.log('❌ WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return <Dashboard />;
};

export default App;
