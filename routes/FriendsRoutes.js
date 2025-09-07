const routes = require("express").Router();
const FriendsController = require("../controllers/FriendsController");

// Send request
routes.post("/request", FriendsController.SendFreindRequest);

// Accept / Reject request (PATCH not PUT ✅)
routes.patch("/request/:requestId", FriendsController.AcceptorRejectFriendRequest);

// Get incoming requests (should be before /:userId ✅)
routes.get("/requests/:userId", FriendsController.GetIncomingFriendRequests);

// Get friends list
routes.get("/:userId", FriendsController.GetFriendsList);

module.exports = routes;
