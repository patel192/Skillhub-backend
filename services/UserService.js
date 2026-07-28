const UserModel = require("../models/UserModel");
const AppError = require("../utils/AppError");

const getUserById = async (id) => {
  const user = await UserModel.findById(id).populate("achievements");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

const getAllUsers = async () => {
  const users = await UserModel.find();
  return users;
};

const updateUser = async (id, updateData) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }
  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await UserModel.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new AppError("User not found", 404);
  }
  return deletedUser;
};

const searchUsers = async (query) => {
  if (!query) {
    return res.json({ users: [] });
  }
  const users = await UserModel.find({
    $or: [
      { fullname: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ],
  }).select("_id fullname email avatar");
  return users;
};

module.exports = {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  searchUsers
};
