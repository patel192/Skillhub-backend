const QuizModel = require("../models/QuizModel");
const AddQuestion = async (req, res) => {
  try {
    const AddedQuestion = await QuizModel.create(req.body);
    res.status(200).json({
      message: "Question Added Successfully",
      data: AddedQuestion,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
const QuestionByCourseId = async (req, res) => {
  try {
    const Questions = await QuizModel.find({ courseId: req.params.courseId });
    res.status(200).json({
      message: "Questions Found Successfully",
      data: Questions,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  AddQuestion,
  QuestionByCourseId,
};
