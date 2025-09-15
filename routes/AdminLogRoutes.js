const route = require("express").Router()
const AdminLogController = require("../controllers/AdminLogController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/adminlog",authMiddleware.verifyToken,authMiddleware.isAdmin,AdminLogController.AddAdminLog)
route.get("/adminlog",authMiddleware.verifyToken,authMiddleware.isAdmin,AdminLogController.GetAdminLogs)
module.exports = route