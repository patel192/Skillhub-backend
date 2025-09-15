const router = require("express").Router()
const AdminOverviewController = require("../controllers/AdminDashboardOverviewController")
const authMiddleware = require("../middleware/authMiddleware")
router.get("/admin/overview",authMiddleware.verifyToken,authMiddleware.isAdmin,AdminOverviewController.Overview)
module.exports = router