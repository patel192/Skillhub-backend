const EnrollmentService = require("../services/EnrollmentService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const AddEnrollment = catchAsync(async (req, res) => {
  const enrollment = await EnrollmentService.addEnrollment(req.body);

  return ResponseHandler.success(
    res,
    "User enrolled successfully",
    enrollment,
    201,
  );
});

const EnrollmentsByUserId = catchAsync(async (req, res) => {
  const enrollments = await EnrollmentService.getEnrollmentsByUserId(
    req.params.userId,
  );

  return ResponseHandler.success(
    res,
    "Enrollments fetched successfully",
    enrollments,
  );
});

const GetEnrollments = catchAsync(async (req, res) => {
  const enrollments = await EnrollmentService.getEnrollments();

  return ResponseHandler.success(
    res,
    "Enrollments fetched successfully",
    enrollments,
  );
});

const MarkLessonComplete = catchAsync(async (req, res) => {
  const result = await EnrollmentService.markLessonComplete(
    req.params.enrollmentId,
    req.params.lessonId,
  );

  return ResponseHandler.success(res, "Lesson marked as complete", result);
});

module.exports = {
  AddEnrollment,
  EnrollmentsByUserId,
  GetEnrollments,
  MarkLessonComplete,
};
