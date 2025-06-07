import Course from '../models/Course.js';
import { getWSS } from '../config/websocket.js';

export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const course = new Course({ title, description });
    const savedCourse = await course.save();
    const wss = getWSS();
    if (wss) {
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ type: 'NEW_COURSE_ADDED' }));
        }
      });
    }

    res.status(201).json({ success: true, data: savedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
