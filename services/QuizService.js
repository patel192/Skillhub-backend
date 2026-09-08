const QuizModel = require("../models/QuizModel");

const addQuestion = async (questionData) => {
  const { courseId, question, options, points } = questionData;

  const addedQuestion = await QuizModel.create({
    courseId,
    question,
    options,
    points,
  });

  return addedQuestion;
};

const getQuestionsByCourseId = async (courseId) => {
  return await QuizModel.find({courseId,});
};

module.exports = {
  addQuestion,
  getQuestionsByCourseId,
};