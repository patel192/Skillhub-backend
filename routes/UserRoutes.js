const route = require("express").Router();
const UserController = require("../controllers/UserController");
route.post("/user", UserController.AddUser);
route.get("/users", UserController.GetAllUsers);
module.exports = route;