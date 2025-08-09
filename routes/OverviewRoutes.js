const route = require("express").Router()
const OverviewController = require("../controllers/OverviewController")
route.post("/overview",OverviewController.AddOverview)
module.exports = route