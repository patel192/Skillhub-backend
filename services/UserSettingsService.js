const UserSettingsModel = require("../models/UserSettingsModel");
const AppError = require("../utils/AppError");

const getUserSettings = async (userId) => {
  let settings = await UserSettingsModel.findOne({
    userId,
  });

  if (!settings) {
    settings = await UserSettingsModel.create({
      userId,
    });
  }

  return settings;
};

const updateUserSettings = async (userId, updateData) => {
  const settings = await UserSettingsModel.findOneAndUpdate(
    {
      userId,
    },
    {
      $set: updateData,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    },
  );

  return settings;
};

module.exports = {
  getUserSettings,
  updateUserSettings,
};
