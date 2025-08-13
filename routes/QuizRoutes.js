const route = require("express").Router()
const QuizController = require("../controllers/QuizController")
route.post("/question",QuizController.AddQuestion)
route.get("/questions/:courseId",QuizController.QuestionByCourseId)
module.exports = route