const route = require("express").Router()
const SearchlogsController = require("../controllers/SearchLogsController")
route.post("/log",SearchlogsController.AddSearchLog)
module.exports = route