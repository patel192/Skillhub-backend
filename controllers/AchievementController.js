const AchievementService = require("../services/AchievementService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

// Create a new achievement
const CreateAchievement = catchAsync(async (req, res) => {
  const { name, icon, pointsRequired } = req.body;
  const achievement = await AchievementService.createAchievement({ name, icon, pointsRequired });
  // keep original status code semantics (201)
  return ResponseHandler.success(res, "Achievement created successfully", achievement, 201);
});

// Check and unlock achievements for a user
const CheckAchievement = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AchievementService.checkAchievement(userId);
  return ResponseHandler.success(res, "Achievements checked successfully", result);
});

// Get all achievements of a user
const GetUserAchievements = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const achievements = await AchievementService.getUserAchievements(userId);
  return ResponseHandler.success(res, "User achievements fetched successfully", achievements);
});

// Get all achievements in the system
const GetAchievements = catchAsync(async (req, res) => {
  const allAchievements = await AchievementService.getAchievements();
  return ResponseHandler.success(res, "All achievements fetched successfully", allAchievements);
});

module.exports = {
  CreateAchievement,
  CheckAchievement,
  GetUserAchievements,
  GetAchievements,
};
