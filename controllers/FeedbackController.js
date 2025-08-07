const FeedbackModel = require("../models/FeedbackModel");
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
module.exports={
    AddFeedback
}
