const route = require('express').Router()
const CourseController = require("../controllers/CourseController")
const authMiddleware = require("../middleware/authMiddleware")
const upload = require("../middleware/upload");
route.post("/course",authMiddleware.verifyToken,authMiddleware.isAdmin,CourseController.CreateCourse)
route.get("/courses",authMiddleware.verifyToken,CourseController.GetCourses)
route.get("/course/:id",authMiddleware.verifyToken,CourseController.CourseById)
route.patch("/course/:id",authMiddleware.verifyToken,authMiddleware.isAdmin,CourseController.UpdateCourse)
route.post("/course/upload-thumbnail",authMiddleware.verifyToken,authMiddleware.isAdmin,upload.single("thumbnail"),CourseController.UploadCourseThumbnail);
module.exports = route;
