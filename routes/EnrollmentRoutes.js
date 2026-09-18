const route = require("express").Router();

const EnrollmentController = require("../controllers/EnrollmentController");

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const {createEnrollmentSchema} = require("../validations/enrollment.validation");

route.post("/enrollments",authMiddleware.verifyToken,validate(createEnrollmentSchema),EnrollmentController.EnrollInCourse);
route.get("/enrollments/me",authMiddleware.verifyToken,EnrollmentController.GetMyEnrollments);
route.get("/enrollments/:enrollmentId",authMiddleware.verifyToken,EnrollmentController.GetMyEnrollmentById);
route.patch("/enrollments/:enrollmentId/lessons/:lessonId/complete",authMiddleware.verifyToken,EnrollmentController.CompleteLesson);
route.patch("/enrollments/:enrollmentId/drop",authMiddleware.verifyToken,EnrollmentController.DropCourse);

module.exports = route;