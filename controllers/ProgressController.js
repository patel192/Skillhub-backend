// controllers/progressController.js
const mongoose = require("mongoose");
const Progress = require("../models/ProgressModel");
const User = require("../models/UserModel");

const toObjectId = (value, name) => {
  if (!value) throw new Error(`${name} is required`);
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error(`${name} must be a valid ObjectId`);
  }
  return new mongoose.Types.ObjectId(value);
};

const normalizeAnswers = (quizAnswers) => {
  const out = {};
  if (quizAnswers && typeof quizAnswers === "object") {
    for (const [k, v] of Object.entries(quizAnswers)) {
      out[k] = typeof v === "string" ? v : String(v);
    }
  }
  return out;
};

const SaveProgress = async (req, res) => {
  try {
    const userId = toObjectId(req.body.userId, "userId");
    const courseId = toObjectId(req.body.courseId, "courseId");

    const currentQuestionIdx = Number(req.body.currentQuestionIdx || 0);
    const points = Number(req.body.points || 0);
    const quizAnswers = normalizeAnswers(req.body.quizAnswers || {});

    // ✅ Save / update progress for this course
    const progress = await Progress.findOneAndUpdate(
      { userId, courseId },
      {
        $set: {
          currentQuestionIdx,
          points,
          quizAnswers,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // ✅ Calculate total points across all courses
    const allProgress = await Progress.find({ userId });
    const totalPoints = allProgress.reduce(
      (sum, p) => sum + (p.points || 0),
      0
    );

    // ✅ Update user model
    await User.findByIdAndUpdate(userId, { points: totalPoints });

    return res.json({ success: true, data: progress });
  } catch (err) {
    console.error("❌ SaveProgress error:", err);
    return res.status(400).json({ success: false, error: err.message });
  }
};

const GetProgress = async (req, res) => {
  try {
    const userId = toObjectId(req.params.userId, "userId");
    const courseId = toObjectId(req.params.courseId, "courseId");

    const progress = await Progress.findOne({ userId, courseId });
    return res.json({ success: true, data: progress });
  } catch (err) {
    console.error("❌ GetProgress error:", err);
    return res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { SaveProgress, GetProgress };
