const route = require("express").Router()
const EnrollmentController = require("../controllers/EnrollmentController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/enrollment",authMiddleware.verifyToken,EnrollmentController.AddEnrollment)
route.get("/enrollment/:userId",authMiddleware.verifyToken,EnrollmentController.EnrollmentsByUserId)
route.get("/enrollments",authMiddleware.verifyToken,authMiddleware.isAdmin,EnrollmentController.GetEnrollments)
route.patch("/enrollment/mark-complete/:enrollmentId/:lessonId",authMiddleware.verifyToken,EnrollmentController.MarkLessonComplete)
module.exports = route;