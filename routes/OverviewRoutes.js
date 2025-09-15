const route = require("express").Router()
const OverviewController = require("../controllers/OverviewController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/overview",authMiddleware.verifyToken,authMiddleware.isAdmin,OverviewController.AddOverview)
route.get("/overview/:courseId",authMiddleware.verifyToken,OverviewController.OverviewByCourseId)
route.patch("/overview/:courseId",authMiddleware.verifyToken,authMiddleware.isAdmin,OverviewController.UpdateOverview)
module.exports = route;