const EnrollmentModel = require("../models/EnrollmentModel");
const ResourceModel = require("../models/ResourcesModel");
const eventEmitter = require("../events/EventEmitter");
const AppError = require("../utils/AppError");

const addEnrollment = async (enrollmentData) => {
  const enrollment = await EnrollmentModel.create(enrollmentData);

  eventEmitter.emit("ENROLLMENT_CREATED", {
    userId: enrollment.userId,
    courseId: enrollment.courseId,
  });

  return enrollment;
};

const getEnrollmentsByUserId = async (userId) => {
  const enrollments = await EnrollmentModel.find({
    userId,
  }).populate("courseId");

  return enrollments;
};

const getEnrollments = async () => {
  return await EnrollmentModel.find().populate("courseId");
};

const markLessonComplete = async (enrollmentId, lessonId) => {
  const enrollment = await EnrollmentModel.findById(enrollmentId);

  if (!enrollment) {
    throw new AppError("Enrollment not found", 404);
  }

  if (!enrollment.completedLessons.includes(lessonId)) {
    enrollment.completedLessons.push(lessonId);

    const totalLessons = await ResourceModel.countDocuments({
      courseId: enrollment.courseId,
    });

    const completedLessons = enrollment.completedLessons.length;

    enrollment.progress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    if (enrollment.progress === 100) {
      enrollment.status = "completed";
    }

    await enrollment.save();
  }

  return {
    progress: enrollment.progress,
    completedLessons: enrollment.completedLessons,
  };
};

module.exports = {
  addEnrollment,
  getEnrollmentsByUserId,
  getEnrollments,
  markLessonComplete,
};
