const ResourceModel = require("../models/ResourcesModel");
const AppError = require("../utils/AppError");

const createResource = async (userId,resourceData) => {
  const resource = await ResourceModel.create({
    ...resourceData,
    createdBy:userId
  });
  return resource;
}

const getResources = async() => {
  return await ResourceModel.find()
  .populate("createdBy","fullname email")
  .populate("category","name")
  .sort({createdAt:-1});
}

const getResourceById = async (resourceId) => {
  const resource = await ResourceModel.findById(resourceId)
  .populate("createdBy","fullname email")
  .populate("category","name");

  if(!resource){
    throw new AppError("Resource not found",404)
  }

  return resource;
}

const updateResource = async(resourceId,userId,updateData) => {
  const resource = await ResourceModel.findById(resourceId);
  if(!resource){
    throw new AppError("Resource not found",404);
  }

  if(resource.createdBy.toString() !== userId.toString()){
    throw new AppError("You are not authorized to manage this resource",403);
  }

  return await ResourceModel.findByIdAndUpdate(
    resourceId,
    updateData,
    {
      new:true,
      runValidators:true
    }
  )
  .populate("createdBy","fullname email")
  .populate("category","name");
}

const deleteResource = async (resourceId,userId) => {
  const resource = await ResourceModel.findById(resourceId);
  if(!resource){
    throw new AppError("Resource not found",404);
  }

  if(resource.createdBy.toString() !== userId.toString()){
    throw new AppError("You are not authorized to delete this resource",403)
  }

  await ResourceModel.findByIdAndDelete(resourceId);
}

module.exports = {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource
}