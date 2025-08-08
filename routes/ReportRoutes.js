const route = require("express").Router()
const ReportController = require("../controllers/ReportController")
route.post("/report",ReportController.AddReport)
module.exports = route