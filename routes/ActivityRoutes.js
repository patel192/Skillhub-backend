const routes = require("express").Router();
const Activitycontroller = require("../controllers/ActivityController");
routes.get("/:userId", Activitycontroller.ActivityByUserId);
module.exports = routes;
