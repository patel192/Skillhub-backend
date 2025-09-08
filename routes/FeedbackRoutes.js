const route = require("express").Router()
const FeedbackController = require("../controllers/FeedbackController")
route.post("/feedback",FeedbackController.AddFeedback)
route.get("/feedback/course/:courseId", FeedbackController.GetFeedbackByCourse);
route.get("/feedback/user/:userId", FeedbackController.GetFeedbackByUser);
module.exports = route