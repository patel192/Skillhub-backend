const ReportService = require("../services/ReportService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const AddReport = catchAsync(async (req, res) => {
  const report = await ReportService.addReport(req.body);

  return ResponseHandler.success(
    res,
    "Report submitted successfully",
    report,
    201,
  );
});

const GetReports = catchAsync(async (req, res) => {
  const reports = await ReportService.getReports(req.query);

  return ResponseHandler.success(res, "Reports fetched successfully", reports);
});

const UpdateReportStatus = catchAsync(async (req, res) => {
  const report = await ReportService.updateReportStatus(
    req.params.id,
    req.body,
  );

  return ResponseHandler.success(
    res,
    "Report status updated successfully",
    report,
  );
});

const GetReportById = catchAsync(async (req, res) => {
  const report = await ReportService.getReportById(req.params.id);

  return ResponseHandler.success(res, "Report fetched successfully", report);
});

const DeleteReport = catchAsync(async (req, res) => {
  await ReportService.deleteReport(req.params.id);

  return ResponseHandler.success(res, "Report deleted successfully");
});

module.exports = {
  AddReport,
  GetReports,
  UpdateReportStatus,
  GetReportById,
  DeleteReport,
};
