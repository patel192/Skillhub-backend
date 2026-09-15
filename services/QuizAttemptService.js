const QuizAttemptModel = require("../models/QuizAttemptModel");
const QuizModel = require("../models/QuizModel");
const QuestionModel = require("../models/QuestionModel");
const AppError = require("../utils/AppError");

const submitQuizAttempt = async (quizId, userId, answers) => {
  // quiz must exist and be published
  const quiz = await QuizModel.findOne({
    _id: quizId,
    status: "published",
  });

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  // get all questions belonging to this quiz
  const questions = await QuestionModel.find({
    quiz: quizId,
  }).lean();

  if (questions.length === 0) {
    throw new AppError("Quiz has no questions", 400);
  }

  // prevent duplicate answers for the same question
  const questionIds = new Set();

  for (const answer of answers) {
    if (questionIds.has(answer.question)) {
      throw new AppError(`Duplicate answer for question ${answer.question}`,400);
    }

    questionIds.add(answer.question);
  }

  // make sure every submitted question belongs to this quiz
  const questionMap = new Map(
    questions.map((question) => [
      question._id.toString(),
      question,
    ])
  );

  for (const answer of answers) {
    if (!questionMap.has(answer.question)) {
      throw new AppError(`Question ${answer.question} does not belong to this quiz`,400);
    }
  }

  // score the submission
  let score = 0;

  const processedAnswers = answers.map((answer) => {
    const question = questionMap.get(answer.question);

    const selectedOption = question.options.find(
      (option) =>
        option._id.toString() === answer.selectedOption
    );

    if (!selectedOption) {
      throw new AppError(`Selected option does not belong to question ${answer.question}`,400);
    }

    if (selectedOption.isCorrect) {
      score += question.points;
    }

    return {
      question: question._id,
      selectedOption: selectedOption._id,
    };
  });

  // calculate total possible points
  const totalPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );

  const percentage =
    totalPoints > 0
      ? Number(((score / totalPoints) * 100).toFixed(2))
      : 0;

  const passed = percentage >= quiz.passingScore;

  // save the attempt
  return await QuizAttemptModel.create({
    quiz: quizId,
    user: userId,
    answers: processedAnswers,
    score,
    percentage,
    passed,
    submittedAt: new Date(),
  });
};

module.exports = {
  submitQuizAttempt,
};