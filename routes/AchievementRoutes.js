const route = require("express").Router();
const AchievementController = require("../controllers/AchievementController");
const authMiddleware = require("../middleware/authMiddleware")

route.post("/achievement",authMiddleware.verifyToken,authMiddleware.isAdmin, AchievementController.CreateAchievement);
route.get("/achievements",authMiddleware.verifyToken, AchievementController.GetAchievements);
route.post("/check/:userId",authMiddleware.verifyToken, AchievementController.CheckAchievement);
route.get("/achievement/:userId",authMiddleware.verifyToken, AchievementController.GetUserAchievements);

module.exports = route;
