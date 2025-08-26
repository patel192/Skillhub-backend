const route = require("express").Router()
const AchievementController = require("../controllers/AchievementController")
route.post("/achievement",AchievementController.CreateAchievement)
route.get("/achievements",AchievementController.GetAchievements)
route.get("/check/:userId",AchievementController.CheckAchievement)
route.get("/achievement/:userId",AchievementController.GetUserAchievements)
module.exports = route