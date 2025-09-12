const QuizModel = require("../models/QuizModel");
const AddQuestion = async (req, res) => {
  try {
    const { courseId, question, options, points } = req.body;
    if (!courseId || !question || !options || options.length !== 4) {
      return res.status(400).json({
        message: "CourseId, question and exactly 4 options are required",
      });
    }

    // Ensure at least one correct option
    const hasCorrect = options.some((opt) => opt.isCorrect === true);
    if (!hasCorrect) {
      return res.status(400).json({
        message: "At least one option must be marked as correct",
      });
    }

    const AddedQuestion = await QuizModel.create({
      courseId,
      question,
      options,
      points: points || 1, 
    });

    res.status(201).json(AddedQuestion);
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
