const route = require("express").Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware")
// public routes
route.post("/user", UserController.AddUser);
route.post("/loginuser", UserController.LoginUser);
// protected routes
route.get("/users",authMiddleware.verifyToken, UserController.GetAllUsers);
route.get("/user/search",authMiddleware.verifyToken,UserController.SearchUser)
route.get("/user/:id",authMiddleware.verifyToken,UserController.GetUserById)
route.put("/user/:id",authMiddleware.verifyToken,UserController.UpdateUser)
// admin routes
route.delete("/user/:id",authMiddleware.verifyToken,authMiddleware.isAdmin,UserController.DeleteUserById)
module.exports = route;