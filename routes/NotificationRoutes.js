const route = require("express").Router()
const NotificationController = require("../controllers/NotificationController")
route.get("/:userId",NotificationController.AllNotificationForUser)
route.patch("/:id/read",NotificationController.ReadMessage)
module.exports = route