const QuizModel = require("../models/QuizModel");
const AppError = require("../utils/AppError");

const addQuestion = async (questionData) => {
  const { courseId, question, options, points } = questionData;

  if (!courseId || !question || !options || options.length !== 4) {
    throw new AppError(
      "CourseId, question and exactly 4 options are required",
      400,
    );
  }

  const hasCorrectOption = options.some((option) => option.isCorrect === true);

  if (!hasCorrectOption) {
    throw new AppError("At least one option must be marked as correct", 400);
  }

  const addedQuestion = await QuizModel.create({
    courseId,
    question,
    options,
    points: points || 1,
  });

  return addedQuestion;
};

const getQuestionsByCourseId = async (courseId) => {
  return await QuizModel.find({
    courseId,
  });
};

module.exports = {
  addQuestion,
  getQuestionsByCourseId,
};
