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
const DeleteResource = async (req, res) => {
  try {
    const deleted = await ResourcesModel.findByIdAndDelete(req.params.lessonId);
    if (!deleted) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json({ message: "Lesson deleted successfully", data: deleted });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
const UpdateResource = async (req, res) => {
  try {
    const updated = await ResourcesModel.findByIdAndUpdate(
      req.params.lessonId,
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json({ message: "Lesson updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
module.exports = {
  AddResource, GetResourceByCourseId, DeleteResource, UpdateResource
};
