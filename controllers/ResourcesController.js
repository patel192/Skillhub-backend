const ResourcesModel = require("../models/ResourcesModel");
const AddResource = async (req, res) => {
  try {
    const AddedResource = await ResourcesModel.create(req.body);
    res.status(200).json({
      message: "Resource Added Successfully",
      data: AddedResource,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
const GetResourceByCourseId = async (req, res) => {
  try {
    const Resource = await ResourcesModel.find({
      courseId: req.params.courseId,
    });
    res.status(200).json({
      message: "Course Resource Found Successfully",
      data: Resource,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  AddResource,GetResourceByCourseId
};
