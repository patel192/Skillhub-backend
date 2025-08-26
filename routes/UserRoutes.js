const route = require("express").Router();
const UserController = require("../controllers/UserController");
route.post("/user", UserController.AddUser);
route.get("/users", UserController.GetAllUsers);
route.post("/loginuser", UserController.LoginUser);
route.get("/user/:id",UserController.GetUserById)
route.put("/user/:id",UserController.UpdateUser)
module.exports = route;