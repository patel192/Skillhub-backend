const MessageService = require("../services/MessagesService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const SendMessage = catchAsync(async (req, res) => {
  const message = await MessageService.sendMessage(req.body);

  return ResponseHandler.success(
    res,
    "Message sent successfully",
    message,
    201,
  );
});

const GetConversations = catchAsync(async (req, res) => {
  const messages = await MessageService.getConversation(
    req.params.userId,
    req.params.otherUserId,
  );

  return ResponseHandler.success(
    res,
    "Conversation fetched successfully",
    messages,
  );
});

const AddReaction = catchAsync(async (req, res) => {
  const message = await MessageService.addReaction(
    req.params.id,
    req.body.userId,
    req.body.emoji,
  );

  return ResponseHandler.success(res, "Reaction updated successfully", message);
});

const ReplyToMessage = catchAsync(async (req, res) => {
  const reply = await MessageService.replyToMessage(
    req.params.id,
    req.body.senderId,
    req.body.receiverId,
    req.body.text,
  );

  return ResponseHandler.success(res, "Reply sent successfully", reply, 201);
});

const DeleteMessage = catchAsync(async (req, res) => {
  await MessageService.deleteMessage(req.params.id);

  return ResponseHandler.success(res, "Message deleted successfully");
});

const EditMessage = catchAsync(async (req, res) => {
  const message = await MessageService.editMessage(
    req.params.id,
    req.body.text,
  );

  return ResponseHandler.success(res, "Message updated successfully", message);
});

module.exports = {
  SendMessage,
  GetConversations,
  AddReaction,
  ReplyToMessage,
  DeleteMessage,
  EditMessage,
};
