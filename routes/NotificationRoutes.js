const route = require("express").Router()
const NotificationController = require("../controllers/NotificationController")
const authMiddleware = require("../middleware/authMiddleware")
route.get("/:userId",authMiddleware.verifyToken,NotificationController.AllNotificationForUser)
route.patch("/:id/read",authMiddleware.verifyToken,NotificationController.ReadMessage)
module.exports = route