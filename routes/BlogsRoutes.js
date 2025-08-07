const route = require("express").Router()
const BlogsController = require("../controllers/BlogsController")
route.post("/blog",BlogsController.AddBlog)
module.exports = route