const FeedbackModel = require("../models/FeedbackModel");

// Add feedback
const AddFeedback = async (req, res) => {
  try {
    const AddedFeedback = await FeedbackModel.create(req.body);
    res.status(200).json({
      message: "Feedback Added Successfully",
      data: AddedFeedback,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

// Get feedback by course
const GetFeedbackByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const feedback = await FeedbackModel.find({ courseId })
      .populate("userId", "fullname email") // get user info
      .sort({ createdAt: -1 });

    // calculate average rating
    const avgRating =
      feedback.length > 0
        ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
        : 0;

    res.status(200).json({
      averageRating: avgRating.toFixed(1),
      totalFeedback: feedback.length,
      feedback,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

// Get feedback by user
const GetFeedbackByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const feedback = await FeedbackModel.find({ userId }).populate(
      "courseId",
      "title"
    );

    res.status(200).json({
      totalFeedback: feedback.length,
      feedback,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = {
  AddFeedback,
  GetFeedbackByCourse,
  GetFeedbackByUser,
};
