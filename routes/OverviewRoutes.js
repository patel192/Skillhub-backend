const route = require("express").Router()
const OverviewController = require("../controllers/OverviewController")
route.post("/overview",OverviewController.AddOverview)
route.get("/overview/:courseId",OverviewController.OverviewByCourseId)
route.patch("/overview/:courseId",OverviewController.UpdateOverview)
module.exports = route;