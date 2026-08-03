const UserService = require("../services/UserService");
const AuthService = require("../services/AuthService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const verifyEmail = catchAsync(async(req,res) => {
  const result = await AuthService.verifyEmail(req.body);
  return ResponseHandler.success(res,"Email verified successfully",result,200);
});

const resendVerificationOTP = catchAsync(async (req,res) => {
  const result = await AuthService.resendVerificationOTP(req.body);
  return ResponseHandler.success(res,"A new verification OTP has been sent to your email.",result,200);
});

const refreshAccessToken = catchAsync(async (req,res) => {
  const result = await AuthService.refreshAccessToken(req.body.refreshToken);
  return ResponseHandler.success(res,"Access token refreshed successfully.",result)
})

const AddUser = catchAsync(async (req, res) => {
  const user = await AuthService.register(req.body);
  return ResponseHandler.success(res, "Registration successful,Please verify your email using the OTP sent to your inbox.", user, 201);
});

const GetAllUsers = catchAsync(async (req, res) => {
  const users = await UserService.getAllUsers();
  return ResponseHandler.success(res, "users fetched successfully", users);
});

const LoginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.login(email, password, req);
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

const forgotPassword = catchAsync(async (req,res) => {
   const result = await AuthService.forgotPassword(req.body);

   return ResponseHandler.success(res,"Password reset OTP sent successfully.",result);
});

const verifyResetOTP = catchAsync(async (req,res) => {
  const result = await AuthService.verifyResetOTP(req.body);
  return ResponseHandler.success(res,"Password reset OTP verified successfully.",result);
});

const resetPassword = catchAsync(async (req,res) => {
  const result = await AuthService.resetPassword(req.body);
  return ResponseHandler.success(res,"Password has been reset successfully",result);
})

const logout = catchAsync(async (req,res) => {
   await AuthService.logout(req.body.refreshToken);
   return ResponseHandler.success(res,"Logged out successfully.",null);
})


module.exports = {
  verifyEmail,
  resendVerificationOTP,
  AddUser,
  GetAllUsers,
  LoginUser,
  GetUserById,
  UpdateUser,
  SearchUser,
  DeleteUser,
  ChangePassword,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  verifyResetOTP,
};
