const route = require("express").Router()
const ResourcesController = require("../controllers/ResourcesController")
route.post("/lesson",ResourcesController.AddResource)
route.get("/lessons/:courseId",ResourcesController.GetResourceByCourseId)
module.exports = route