const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSettings = require("../models/UserSettingsModel");
const UserService = require("../services/UserService");
const AuthService = require("../services/AuthService");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const AddUser = catchAsync(async (req, res) => {
  const user = await AuthService.register(req.body);
  return ResponseHandler.success(res, "User added successfully", user, 200);
});

const GetAllUsers = catchAsync(async (req, res) => {
  const users = await UserService.getAllUsers();
  return ResponseHandler.success(res, "users fetched successfully", users);
});

const LoginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.login(email, password);
  return ResponseHandler.success(res, "Logged In Successfully", result);
});

const UpdateUser = catchAsync(async (req, res) => {
  const updatedUser = await UserService.updateUser(req.params.id, req.body);
  return ResponseHandler.success(res, "User updated successfully", updatedUser);
});

const SearchUser = catchAsync(async (req, res) => {
  const users = await UserService.searchUsers(req.query.q);
  return ResponseHandler.success(res,"Users fetched successfully",users);
});

const GetUserById = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  return ResponseHandler.success(res, "User fetched successfully", user);
});

const DeleteUser = catchAsync(async (req, res) => {
  const deletedUser = await UserService.deleteUser(req.params.id);
  return ResponseHandler.success(res, "User deleted successfully", deletedUser);
});

const ChangePassword = catchAsync(async (req, res) => {
  await AuthService.changePassword(
    req.params.userId,
    req.user.id,
    req.body.currentPassword,
    req.body.newPassword,
  );

  return ResponseHandler.success(res, "Password changed successfully", {
    changedAt: new Date().toISOString(),
  });
});

module.exports = {
  AddUser,
  GetAllUsers,
  LoginUser,
  GetUserById,
  UpdateUser,
  SearchUser,
  DeleteUser,
  ChangePassword,
};
