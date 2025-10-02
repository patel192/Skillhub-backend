const route = require("express").Router();
const ResourcesController = require("../controllers/ResourcesController");

// No token verification, no admin check
route.post("/lessons", ResourcesController.AddResource);
route.get("/lessons/:courseId", ResourcesController.GetResourceByCourseId);

module.exports = route;
