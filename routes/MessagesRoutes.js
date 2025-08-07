const route = require("express").Router()
const MessagesController = require("../controllers/MessagesController")
route.post("/message",MessagesController.AddMessage)
module.exports = route