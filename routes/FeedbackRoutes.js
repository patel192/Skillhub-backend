const route = require("express").Router()
const FeedbackController = require("../controllers/FeedbackController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/feedback",authMiddleware.verifyToken,FeedbackController.AddFeedback)
route.get("/feedback/course/:courseId",authMiddleware.verifyToken, FeedbackController.GetFeedbackByCourse);
route.get("/feedback/user/:userId",authMiddleware.verifyToken,authMiddleware.isAdmin, FeedbackController.GetFeedbackByUser);
module.exports = route