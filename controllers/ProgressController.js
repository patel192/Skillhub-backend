const ProgressService = require("../services/ProgressService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const SaveProgress = catchAsync(async (req, res) => {
  const progress = await ProgressService.saveProgress(req.body);

  return ResponseHandler.success(res, "Progress saved successfully", progress);
});

const GetProgress = catchAsync(async (req, res) => {
  const progress = await ProgressService.getProgress(
    req.params.userId,
    req.params.courseId,
  );

  return ResponseHandler.success(
    res,
    "Progress fetched successfully",
    progress,
  );
});

module.exports = {
  SaveProgress,
  GetProgress,
};
