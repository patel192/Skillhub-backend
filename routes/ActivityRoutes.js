const routes = require("express").Router();
const Activitycontroller = require("../controllers/ActivityController");
const authMiddleware = require("../middleware/authMiddleware")
routes.get("/:userId",authMiddleware.verifyToken,Activitycontroller.ActivityByUserId);
module.exports = routes;
