const EnrollmentController = require("../models/EnrollmentModel");
const Resource = require("../models/ResourcesModel");
const eventEmitter = require("../events/EventEmitter");
const AddEnrollment = async (req, res) => {
  try {
    const AddedEnrollment = await EnrollmentController.create(req.body);
    eventEmitter.emit("ENROLLMENT_CREATED", {
      userId: AddedEnrollment.userId,
      courseId: AddedEnrollment.courseId,
    });
    res.status(200).json({
      message: "User Enrolled Successfully",
      data: AddedEnrollment,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
const EnrollmentsByUserId = async (req, res) => {
  try {
    const Enrolls = await EnrollmentController.find({
      userId: req.params.userId,
    }).populate("courseId");
    res.status(200).json({
      message: "Enrolls For user Found Successfully",
      data: Enrolls,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetEnrollments = async (req, res) => {
  try {
    const Enrolls = await EnrollmentController.find().populate("courseId");
    res.status(200).json({
      message: "Enrolls Found Successfully",
      data: Enrolls,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const MarkLessonComplete = async (req, res) => {
try {
    const { enrollmentId, lessonId } = req.params;

    const enrollment = await EnrollmentController.findById(enrollmentId);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    // Add lesson if not already completed
    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);

      // Count lessons in this course
      const totalLessons = await Resource.countDocuments({ courseId: enrollment.courseId });
      const completed = enrollment.completedLessons.length;

      // Update progress field
      enrollment.progress =
        totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

      // Auto-mark status if finished
      if (enrollment.progress === 100) {
        enrollment.status = "completed";
      }

      await enrollment.save();
    }

    res.json({
      message: "Lesson marked as complete",
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  AddEnrollment,
  EnrollmentsByUserId,
  GetEnrollments,
  MarkLessonComplete
};
