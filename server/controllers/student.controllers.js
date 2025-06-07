import Student from '../models/Student.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import { getWSS } from '../config/websocket.js';

export const enrollStudent = async (req, res) => {
	try {
		const { name, email, courseId } = req.body;

		if (!name || !email || !courseId) {
			return res.status(400).json({ success: false, message: 'Name, email, and course ID are required' });
		}

		let student = await Student.findOne({ email });
		if (!student) {
			student = new Student({ name, email });
			await student.save();
		}

		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({ success: false, message: 'Course not found' });
		}

		const existingEnrollment = await Enrollment.findOne({
			studentEmail: email,
			courseTitle: course.title,
		});

		if (existingEnrollment) {
			return res.status(400).json({
				success: false,
				message: 'Student is already enrolled in this course',
			});
		}

		const enrollment = new Enrollment({
			studentEmail: email,
			courseTitle: course.title,
			enrolledAt: new Date(),
		});

		await enrollment.save();
		const wss = getWSS();
		if (wss) {
			wss.clients.forEach((client) => {
				if (client.readyState === 1) {
					client.send(JSON.stringify({ type: 'NEW_ENROLLMENT_ADDED' }));
				}
			});
		}

		return res.status(201).json({
			success: true,
			message: 'Student enrolled successfully',
			data: enrollment,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
			error: error.message,
		});
	}
};

export const getAllEnrollments = async (req, res) => {
	try {
		const enrollments = await Enrollment.find().sort({ enrolledAt: -1 });
		return res.status(200).json({ success: true, data: enrollments });
	} catch (error) {
		return res.status(500).json({ success: false, message: 'Server error', error: error.message });
	}
};
