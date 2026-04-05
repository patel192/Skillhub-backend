const route = require("express").Router();
const ResourcesController = require("../controllers/ResourcesController");

// No token verification, no admin check
route.post("/lessons", ResourcesController.AddResource);
route.get("/lessons/:courseId", ResourcesController.GetResourceByCourseId);
route.delete("/lessons/:lessonId", ResourcesController.DeleteResource);
route.put("/lessons/:lessonId",ResourcesController.UpdateResource)
module.exports = route;
