const routes = require("express").Router();
const FriendsController = require("../controllers/FriendsController");
const authMiddleware = require("../middleware/authMiddleware")
// Send request
routes.post("/request",authMiddleware.verifyToken,FriendsController.SendFreindRequest);

// Accept / Reject request (PATCH not PUT ✅)
routes.patch("/request/:requestId",authMiddleware.verifyToken,FriendsController.AcceptorRejectFriendRequest);

// Get incoming requests (should be before /:userId ✅)
routes.get("/requests/:userId",authMiddleware.verifyToken,FriendsController.GetIncomingFriendRequests);

// Get friends list
routes.get("/:userId",authMiddleware.verifyToken,FriendsController.GetFriendsList);

module.exports = routes;
