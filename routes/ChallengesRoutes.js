const route = require("express").Router()
const ChallengesController = require("../controllers/ChallengesController")
route.post("/challenges",ChallengesController.AddChallenge)
route.get("/challenges/:courseId",ChallengesController.GetChallengesByCoursId)
module.exports = route