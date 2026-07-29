const mongoose = require("mongoose");
const ProgressModel = require("../models/ProgressModel");
const UserModel = require("../models/UserModel");
const AppError = require("../utils/AppError");

const toObjectId = (value, fieldName) => {
  if (!value) {
    throw new AppError(`${fieldName} is required`, 400);
  }

  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new AppError(`${fieldName} must be a valid ObjectId`, 400);
  }

  return new mongoose.Types.ObjectId(value);
};

const normalizeAnswers = (quizAnswers) => {
  const answers = {};

  if (quizAnswers && typeof quizAnswers === "object") {
    for (const [key, value] of Object.entries(quizAnswers)) {
      answers[key] = typeof value === "string" ? value : String(value);
    }
  }

  return answers;
};

const saveProgress = async (progressData) => {
  const userId = toObjectId(progressData.userId, "userId");

  const courseId = toObjectId(progressData.courseId, "courseId");

  const currentQuestionIdx = Number(progressData.currentQuestionIdx || 0);

  const points = Number(progressData.points || 0);

  const quizAnswers = normalizeAnswers(progressData.quizAnswers || {});

  const progress = await ProgressModel.findOneAndUpdate(
    {
      userId,
      courseId,
    },
    {
      $set: {
        currentQuestionIdx,
        points,
        quizAnswers,
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  const allProgress = await ProgressModel.find({
    userId,
  });

  const totalPoints = allProgress.reduce(
    (sum, item) => sum + (item.points || 0),
    0,
  );

  await UserModel.findByIdAndUpdate(userId, {
    points: totalPoints,
  });

  return progress;
};

const getProgress = async (userId, courseId) => {
  const progress = await ProgressModel.findOne({
    userId: toObjectId(userId, "userId"),
    courseId: toObjectId(courseId, "courseId"),
  });

  return progress;
};

module.exports = {
  saveProgress,
  getProgress,
};
