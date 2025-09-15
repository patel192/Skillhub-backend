const route = require("express").Router()
const ProgressController = require("../controllers/ProgressController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/save",authMiddleware.verifyToken,ProgressController.SaveProgress)
route.get("/:userId/:courseId",authMiddleware.verifyToken,ProgressController.GetProgress)
module.exports = route