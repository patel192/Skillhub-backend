const route = require("express").Router();
const MessagesController = require("../controllers/MessagesController");

// Send message
route.post("/message", MessagesController.SendMessage);

// Get conversation between two users
route.get("/messages/:userId/:otherUserId", MessagesController.GetConversations);

// Add reaction
route.patch("/message/:id/reaction", MessagesController.AddReaction);

// Reply to message
route.patch("/message/:id/reply", MessagesController.ReplyToMessage);

// Delete message
route.delete("/message/:id", MessagesController.DeleteMessage);

module.exports = route;
