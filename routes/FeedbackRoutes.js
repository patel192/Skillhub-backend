const route = require("express").Router()
const FeedbackController = require("../controllers/FeedbackController")
route.post("/feedback",FeedbackController.AddFeedback)
module.exports = route