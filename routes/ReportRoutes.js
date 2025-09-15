const route = require("express").Router()
const ReportController = require("../controllers/ReportController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/report",authMiddleware.verifyToken,ReportController.AddReport)
route.get("/reports",authMiddleware.verifyToken,authMiddleware.isAdmin,ReportController.GetReports); 
route.patch("/reports/:id",authMiddleware.verifyToken,authMiddleware.isAdmin,ReportController.UpdateReportStatus);
route.get("/reports/:id",authMiddleware.verifyToken,authMiddleware.isAdmin,ReportController.GetReportById)
route.delete("/report/:id",authMiddleware.verifyToken,authMiddleware.isAdmin,ReportController.DeleteReport)
module.exports = route;