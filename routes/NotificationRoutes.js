const route = require("express").Router()
const NotificationController = require("../controllers/NotificationController")
route.post("/notification",NotificationController.AddNotification)
module.exports = route