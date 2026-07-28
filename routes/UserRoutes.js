const route = require("express").Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const {loginSchema} = require("../validations/auth.validation");
const validate = require("../middleware/validate");

// public routes
route.post("/user", UserController.AddUser);
route.post("/loginuser",validate(loginSchema),UserController.LoginUser);
// protected routes
route.get("/users",authMiddleware.verifyToken, UserController.GetAllUsers);
route.get("/user/search",authMiddleware.verifyToken,UserController.SearchUser)
route.get("/user/:id",authMiddleware.verifyToken,UserController.GetUserById)
route.put("/user/:id",authMiddleware.verifyToken,UserController.UpdateUser)
route.post("/user/:userId/change-password",authMiddleware.verifyToken,UserController.ChangePassword);
// admin routes
route.delete("/user/:id",authMiddleware.verifyToken,authMiddleware.isAdmin,UserController.DeleteUser)
module.exports = route;