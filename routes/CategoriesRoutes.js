const route = require("express").Router()
const CategoriesController = require("../controllers/CategoriesController")
route.post("/category",CategoriesController.AddCategory)
module.exports = route