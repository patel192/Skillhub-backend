const AchievementModel = require("../models/AchievementModel");
const UserModel = require("../models/UserModel");

// Create a new achievement
const CreateAchievement = async (req, res) => {
  try {
    const { name, icon, pointsRequired } = req.body;
    const achievement = await AchievementModel.create({
      name,
      icon,
      pointsRequired,
    });

    res.status(201).json({
      success: true,
      achievement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Check and unlock achievements for a user
const CheckAchievement = async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await UserModel.findById(userId).populate("achievements");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const allAchievements = await AchievementModel.find();
    let newlyUnlocked = [];

    for (const ach of allAchievements) {
      const alreadyHas = user.achievements.some(
        (a) => a._id.toString() === ach._id.toString()
      );

      if (user.points >= ach.pointsRequired && !alreadyHas) {
        user.achievements.push(ach._id); // 👈 push ID not object
        newlyUnlocked.push(ach);
      }
    }

    await user.save();

    // Re-fetch with populated achievements
    user = await UserModel.findById(userId).populate("achievements");

    res.json({
      success: true,
      newlyUnlocked,
      achievements: user.achievements,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get all achievements of a user
const GetUserAchievements = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId).populate("achievements");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      achievements: user.achievements,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get all achievements in the system
const GetAchievements = async (req, res) => {
  try {
    const allAchievements = await AchievementModel.find();

    res.status(200).json({
      success: true,
      message: "All achievements fetched successfully",
      data: allAchievements,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  CreateAchievement,
  CheckAchievement,
  GetUserAchievements,
  GetAchievements,
};
