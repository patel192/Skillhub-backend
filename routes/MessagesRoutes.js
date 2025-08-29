const route = require("express").Router()
const MessagesController = require("../controllers/MessagesController")
route.post("/message",MessagesController.SendMessage)
route.get("/messages/:userId/:otherUserId",MessagesController.GetConversations)
route.patch("/message/:id/reaction",MessagesController.AddReaction)
route.patch("/message/:id/reply",MessagesController.ReplyToMessage)
route.delete("/message/:id",MessagesController.DeleteMessage)
module.exports = route