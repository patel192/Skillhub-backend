const route = require("express").Router();

const QuizAttemptController = require("../controllers/QuizAttemptController");
const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const {submitQuizAttemptSchema} = require("../validations/quizAttempt.validation");

route.post("/quizzes/:quizId/attempts",authMiddleware.verifyToken,validate(submitQuizAttemptSchema),QuizAttemptController.SubmitQuizAttempt);

module.exports = route;