const route = require("express").Router()
const EnrollmentController = require("../controllers/EnrollmentController")
route.post("/enrollment",EnrollmentController.AddEnrollment)
module.exports = route