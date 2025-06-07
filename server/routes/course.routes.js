import express from 'express';
import { createCourse, getAllCourses } from '../controllers/course.controller.js';

const router = express.Router();

// Create course
router.post('/', createCourse);

// Get all courses
router.get('/', getAllCourses);

export default router;
