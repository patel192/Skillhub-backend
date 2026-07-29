const UserSettingsService = require("../services/UserSettingsService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const getUserSettings = catchAsync(async (req, res) => {
  const settings = await UserSettingsService.getUserSettings(req.user.id);

  return ResponseHandler.success(
    res,
    "User settings fetched successfully",
    settings,
  );
});

const updateUserSettings = catchAsync(async (req, res) => {
  const settings = await UserSettingsService.updateUserSettings(
    req.user.id,
    req.body,
  );

  return ResponseHandler.success(
    res,
    "User settings updated successfully",
    settings,
  );
});

module.exports = {
  getUserSettings,
  updateUserSettings,
};
