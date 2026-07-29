const ReportModel = require("../models/ReportModel");
const AppError = require("../utils/AppError");

const addReport = async (reportData) => {
  const { reporter, type, description, targetType, targetId } = reportData;

  if (!reporter || !type || !targetType || !targetId) {
    throw new AppError("Missing required fields", 400);
  }

  const report = await ReportModel.create({
    reporter,
    type,
    description,
    targetType,
    targetId,
  });

  return report;
};

const getReports = async (query) => {
  const { status, type } = query;

  const filter = {};

  if (status) filter.status = status;
  if (type) filter.type = type;

  const reports = await ReportModel.find(filter)
    .populate("reporter", "fullname email")
    .populate("targetId", "title fullname")
    .sort({
      createdAt: -1,
    });

  return {
    totalReports: reports.length,
    reports,
  };
};

const updateReportStatus = async (reportId, updateData) => {
  const report = await ReportModel.findByIdAndUpdate(
    reportId,
    {
      status: updateData.status,
      resolvedBy: updateData.resolvedBy,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!report) {
    throw new AppError("Report not found", 404);
  }

  return report;
};

const getReportById = async (reportId) => {
  const report = await ReportModel.findById(reportId)
    .populate("reporter", "fullname email")
    .populate("targetId", "title fullname");

  if (!report) {
    throw new AppError("Report not found", 404);
  }

  return report;
};

const deleteReport = async (reportId) => {
  const deletedReport = await ReportModel.findByIdAndDelete(reportId);

  if (!deletedReport) {
    throw new AppError("Report not found", 404);
  }

  return deletedReport;
};

module.exports = {
  addReport,
  getReports,
  updateReportStatus,
  getReportById,
  deleteReport,
};
