const AnalyticsModel = require("../models/AnalyticsModel");

// Add new analytics record
const AddAnalytics = async (req, res) => {
  try {
    const AddedAnalytics = await AnalyticsModel.create(req.body);
    res.status(200).json({
      message: "Analytics Added Successfully",
      data: AddedAnalytics,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

// Fetch analytics (with optional filters)
const GetAnalytics = async (req, res) => {
  try {
    const { type, metric, limit } = req.query;
    let filter = {};

    if (type) filter.type = type;
    if (metric) filter.metric = metric;

    const analytics = await AnalyticsModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) || 50);

    res.status(200).json({ data: analytics });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = {
  AddAnalytics,
  GetAnalytics,
};
