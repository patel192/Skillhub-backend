const route = require("express").Router();
const CourseController = require("../controllers/CourseController");
route.post("/course",CourseController.AddCourse)
route.get("/courses",CourseController.GetCourses)
module.exports = route;