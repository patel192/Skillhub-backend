const route = require("express").Router()
const EventsController = require("../controllers/EventsController")
route.post("/event",EventsController.AddEvent)
module.exports = route