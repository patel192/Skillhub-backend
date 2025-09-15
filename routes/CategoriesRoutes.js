const route = require("express").Router()
const CategoriesController = require("../controllers/CategoriesController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/category",authMiddleware.verifyToken,authMiddleware.isAdmin,CategoriesController.AddCategory)
module.exports = route