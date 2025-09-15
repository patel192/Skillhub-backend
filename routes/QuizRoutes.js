const route = require("express").Router()
const QuizController = require("../controllers/QuizController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/question",authMiddleware.verifyToken,authMiddleware.isAdmin,QuizController.AddQuestion)
route.get("/questions/:courseId",authMiddleware.verifyToken,QuizController.QuestionByCourseId)
module.exports = route