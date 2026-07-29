const ResourceService = require("../services/ResourceService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const AddResource = catchAsync(async (req, res) => {
  const resource = await ResourceService.addResource(req.body);

  return ResponseHandler.success(
    res,
    "Resource added successfully",
    resource,
    201,
  );
});

const GetResourceByCourseId = catchAsync(async (req, res) => {
  const resources = await ResourceService.getResourcesByCourseId(
    req.params.courseId,
  );

  return ResponseHandler.success(
    res,
    "Resources fetched successfully",
    resources,
  );
});

const UpdateResource = catchAsync(async (req, res) => {
  const resource = await ResourceService.updateResource(
    req.params.lessonId,
    req.body,
  );

  return ResponseHandler.success(
    res,
    "Resource updated successfully",
    resource,
  );
});

const DeleteResource = catchAsync(async (req, res) => {
  await ResourceService.deleteResource(req.params.lessonId);

  return ResponseHandler.success(res, "Resource deleted successfully");
});

module.exports = {
  AddResource,
  GetResourceByCourseId,
  UpdateResource,
  DeleteResource,
};
