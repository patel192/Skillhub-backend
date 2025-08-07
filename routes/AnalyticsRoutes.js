const route = require("express").Router()
const AnalyticsController = require("../controllers/AnalyticsController")
route.post("/analytic",AnalyticsController.AddAnalytics)
module.exports = route