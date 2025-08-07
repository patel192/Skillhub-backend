const route = require("express").Router()
const SkillsController = require("../controllers/SkillsController")
route.post("/skill",SkillsController.AddSkill)
module.exports = route