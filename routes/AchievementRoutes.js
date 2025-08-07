const route = require("express").Router()
const AchievementController = require("../controllers/AchievementController")
route.post("/achievement",AchievementController.AddAchievement)
module.exports = route