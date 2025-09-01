const route = require("express").Router()
const EnrollmentController = require("../controllers/EnrollmentController")
route.post("/enrollment",EnrollmentController.AddEnrollment)
route.get("/enrollment/:userId",EnrollmentController.EnrollmentsByUserId)
route.get("/enrollments",EnrollmentController.GetEnrollments)
module.exports = route;