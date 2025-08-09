const route = require("express").Router()
const ResourcesController = require("../controllers/ResourcesController")
route.post("/resource",ResourcesController.AddResource)
module.exports = route