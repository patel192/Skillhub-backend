const route = require("express").Router()
const AdminLogController = require("../controllers/AdminLogController")
route.post("/adminlog",AdminLogController.AddAdminLog)
module.exports = route