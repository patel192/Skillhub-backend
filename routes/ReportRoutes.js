const route = require("express").Router()
const ReportController = require("../controllers/ReportController")
route.post("/report",ReportController.AddReport)
route.get("/reports", ReportController.GetReports); 
route.patch("/reports/:id", ReportController.UpdateReportStatus);
route.get("/reports/:id",ReportController.GetReportById)
route.delete("/report/:id",ReportController.DeleteReport)
module.exports = route;