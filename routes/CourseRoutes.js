const route = require('express').Router()
const CourseController = require("../controllers/CourseController")
route.post("/course",CourseController.CreateCourse)
route.get("/courses",CourseController.GetCourses)
route.get("/course/:id",CourseController.CourseById)
module.exports = route;
