const route = require("express").Router()
const ResourcesController = require("../controllers/ResourcesController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/lessons",authMiddleware.verifyToken,authMiddleware.isAdmin,ResourcesController.AddResource)
route.get("/lessons/:courseId",authMiddleware.verifyToken,ResourcesController.GetResourceByCourseId)
module.exports = route