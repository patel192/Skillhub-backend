const ResourceModel = require("../models/ResourcesModel");
const AppError = require("../utils/AppError");

const addResource = async (resourceData) => {
  const resource = await ResourceModel.create(resourceData);

  return resource;
};

const getResourcesByCourseId = async (courseId) => {
  return await ResourceModel.find({
    courseId,
  });
};

const updateResource = async (lessonId, updateData) => {
  const updatedResource = await ResourceModel.findByIdAndUpdate(
    lessonId,
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedResource) {
    throw new AppError("Lesson not found", 404);
  }

  return updatedResource;
};

const deleteResource = async (lessonId) => {
  const deletedResource = await ResourceModel.findByIdAndDelete(lessonId);

  if (!deletedResource) {
    throw new AppError("Lesson not found", 404);
  }

  return deletedResource;
};

module.exports = {
  addResource,
  getResourcesByCourseId,
  updateResource,
  deleteResource,
};
