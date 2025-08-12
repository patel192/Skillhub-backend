const route = require("express").Router()
const ResourcesController = require("../controllers/ResourcesController")
route.post("/lessons",ResourcesController.AddResource)
route.get("/lessons/:courseId",ResourcesController.GetResourceByCourseId)
module.exports = route