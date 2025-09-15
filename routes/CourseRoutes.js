const route = require('express').Router()
const CourseController = require("../controllers/CourseController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/course",authMiddleware.verifyToken,authMiddleware.isAdmin,CourseController.CreateCourse)
route.get("/courses",authMiddleware.verifyToken,CourseController.GetCourses)
route.get("/course/:id",authMiddleware.verifyToken,CourseController.CourseById)
route.patch("/course/:id",authMiddleware.verifyToken,authMiddleware.isAdmin,CourseController.UpdateCourse)
module.exports = route;
