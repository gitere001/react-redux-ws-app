import express from 'express';
import { enrollStudent, getAllEnrollments,  } from '../controllers/student.controllers.js';

const router = express.Router();

// Enroll student
router.post('/', enrollStudent);

// Get all students
router.get('/', getAllEnrollments);

export default router;
