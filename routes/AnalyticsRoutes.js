const route = require("express").Router()
const AnalyticsController = require("../controllers/AnalyticsController")
route.post("/analytic",AnalyticsController.AddAnalytics)
route.get("/analytic",AnalyticsController.GetAnalytics)
module.exports = route