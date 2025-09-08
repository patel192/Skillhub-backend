const ReportModel = require("../models/ReportModel");

// Add new report
const AddReport = async (req, res) => {
   try {
    const { reporter, type, description, targetType, targetId } = req.body;

    if (!reporter || !type || !targetType || !targetId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const report = await ReportModel.create({
      reporter,
      type,
      description,
      targetType,
      targetId,
    });

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    console.error("Error creating report:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all reports (with filters)
const GetReports = async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const reports = await ReportModel.find(filter)
      .populate("reporter", "fullname email")
      .populate("targetId", "title fullname") // course title or user fullname
      .sort({ createdAt: -1 });

    res.status(200).json({
      totalReports: reports.length,
      reports,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// Update report status (admin only)
const UpdateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolvedBy } = req.body;

    const updated = await ReportModel.findByIdAndUpdate(
      id,
      { status, resolvedBy },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({
      message: "Report status updated",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

module.exports = {
  AddReport,
  GetReports,
  UpdateReportStatus,
};
