const route = require("express").Router();

const QuizController = require("../controllers/QuizController")
const authMiddleware = require("../middleware/authMiddleware")

const validate = require("../middleware/validate");
const {addQuestionSchema,quizCourseQuerySchema} = require("../validations/quiz.validation");


route.post("/question",authMiddleware.verifyToken,validate(addQuestionSchema),QuizController.AddQuestion)
route.get("/questions/:courseId",authMiddleware.verifyToken,validate(quizCourseQuerySchema),QuizController.QuestionByCourseId)
module.exports = route