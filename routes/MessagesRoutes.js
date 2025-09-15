const route = require("express").Router();
const MessagesController = require("../controllers/MessagesController");
const authMiddleware = require("../middleware/authMiddleware")
// Send message
route.post("/message",authMiddleware.verifyToken,MessagesController.SendMessage);

// Get conversation between two users
route.get("/messages/:userId/:otherUserId",authMiddleware.verifyToken,MessagesController.GetConversations);

// Add reaction
route.patch("/message/:id/reaction",authMiddleware.verifyToken,MessagesController.AddReaction);

// Reply to message
route.patch("/message/:id/reply",authMiddleware.verifyToken,MessagesController.ReplyToMessage);

// Delete message
route.delete("/message/:id",authMiddleware.verifyToken,MessagesController.DeleteMessage);

module.exports = route;
