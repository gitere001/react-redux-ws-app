import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  courseTitle: { type: String, required: true },
  enrolledAt: { type: Date, default: Date.now },
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
