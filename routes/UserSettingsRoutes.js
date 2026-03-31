const route = require("express").Router();
const UserSettings = require("../controllers/UserSettingsController");
route.get("/user/:userId/settings",UserSettings.getUserSettings)
route.put("/user/:userId/settings",UserSettings.updateUserSettings);
module.exports = route;