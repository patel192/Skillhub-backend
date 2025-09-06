const routes = require("express").Router();
const FriendsController = require("../controllers/FriendsController")
routes.post("/request",FriendsController.SendFreindRequest)
routes.patch("/:requestId",FriendsController.AcceptorRejectFriendRequest)
routes.get("/:userId",FriendsController.GetFriendsList)
module.exports = routes;