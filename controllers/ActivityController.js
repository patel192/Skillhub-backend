const Activity = require("../models/ActivityLogModel");
const ActivityByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const Activities = await Activity.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      message: "Activities fetched successfully",
      data: Activities,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};
module.exports = {ActivityByUserId}