const QuizAttemptService = require("../services/QuizAttemptService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const SubmitQuizAttempt = catchAsync(async (req, res) => {
  const attempt = await QuizAttemptService.submitQuizAttempt(req.validated.params.quizId,req.user.id,req.validated.body.answers);
  return ResponseHandler.success(res,"Quiz submitted successfully",attempt,201);
});

module.exports = {
  SubmitQuizAttempt,
};