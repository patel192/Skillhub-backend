const QuizService = require("../services/QuizService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const AddQuestion = catchAsync(async (req, res) => {
  const question = await QuizService.addQuestion(req.body);

  return ResponseHandler.success(
    res,
    "Question added successfully",
    question,
    201,
  );
});

const QuestionByCourseId = catchAsync(async (req, res) => {
  const questions = await QuizService.getQuestionsByCourseId(
    req.params.courseId,
  );

  return ResponseHandler.success(
    res,
    "Questions fetched successfully",
    questions,
  );
});

module.exports = {
  AddQuestion,
  QuestionByCourseId,
};
