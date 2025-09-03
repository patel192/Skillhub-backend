const route = require("express").Router()
const EnrollmentController = require("../controllers/EnrollmentController")
route.post("/enrollment",EnrollmentController.AddEnrollment)
route.get("/enrollment/:userId",EnrollmentController.EnrollmentsByUserId)
route.get("/enrollments",EnrollmentController.GetEnrollments)
route.patch("/enrollment/mark-complete/:enrollmentId/:lessonId",EnrollmentController.MarkLessonComplete)
module.exports = route;