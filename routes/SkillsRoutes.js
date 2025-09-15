const route = require("express").Router()
const SkillsController = require("../controllers/SkillsController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/skill",authMiddleware.verifyToken,SkillsController.AddSkill)
module.exports = route