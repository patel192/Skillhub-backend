const route = require("express").Router()
const ProgressController = require("../controllers/ProgressController")
route.post("/save",ProgressController.SaveProgress)
route.get("/:userId/:courseId",ProgressController.GetProgress)
module.exports = route