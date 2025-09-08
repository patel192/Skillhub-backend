const router = require("express").Router()
const AdminOverviewController = require("../controllers/AdminDashboardOverviewController")
router.get("/admin/overview",AdminOverviewController.Overview)
module.exports = router