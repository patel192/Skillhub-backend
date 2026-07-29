const MessagesModel = require("../models/MessagesModel");
const { getIO } = require("../socket");
const AppError = require("../utils/AppError");

const sendMessage = async ({ senderId, receiverId, text, replyTo }) => {
  const message = await MessagesModel.create({
    senderId,
    receiverId,
    text,
    replyTo: replyTo || null,
    read: false,
  });

  const populatedMessage = await MessagesModel.findById(message._id)
    .populate("senderId", "fullname name email avatar")
    .populate("replyTo", "text")
    .populate("reactions.userId", "fullname");

  const io = getIO();

  io.to(receiverId.toString()).emit("new_message", {
    message: populatedMessage,
  });

  return populatedMessage;
};

const getConversation = async (userId, otherUserId) => {
  const messages = await MessagesModel.find({
    $or: [
      {
        senderId: userId,
        receiverId: otherUserId,
      },
      {
        senderId: otherUserId,
        receiverId: userId,
      },
    ],
  })
    .populate("senderId", "name email fullname avatar")
    .populate("replyTo", "text senderId")
    .populate("reactions.userId", "fullname")
    .sort({ createdAt: 1 });

  await MessagesModel.updateMany(
    {
      senderId: otherUserId,
      receiverId: userId,
      read: false,
    },
    {
      read: true,
    },
  );

  return messages;
};

const addReaction = async (messageId, userId, emoji) => {
  let message = await MessagesModel.findById(messageId);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  const existingReaction = message.reactions.findIndex(
    (reaction) => reaction.userId.toString() === userId,
  );

  if (existingReaction >= 0) {
    if (message.reactions[existingReaction].emoji === emoji) {
      message.reactions.splice(existingReaction, 1);
    } else {
      message.reactions[existingReaction].emoji = emoji;
    }
  } else {
    message.reactions.push({
      userId,
      emoji,
    });
  }

  await message.save();

  message = await message.populate("reactions.userId", "fullname");

  const io = getIO();

  io.to([message.senderId.toString(), message.receiverId.toString()]).emit(
    "reaction_updated",
    {
      message,
    },
  );

  return message;
};

const replyToMessage = async (messageId, senderId, receiverId, text) => {
  const reply = await MessagesModel.create({
    senderId,
    receiverId,
    text,
    replyTo: messageId,
  });

  const populatedReply = await MessagesModel.findById(reply._id)
    .populate("senderId", "fullname name email avatar")
    .populate("replyTo", "text");

  const io = getIO();

  io.to(receiverId.toString()).emit("new_message", {
    message: populatedReply,
  });

  return populatedReply;
};

const deleteMessage = async (messageId) => {
  const message = await MessagesModel.findById(messageId);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  const senderId = message.senderId.toString();

  const receiverId = message.receiverId.toString();

  await MessagesModel.findByIdAndDelete(messageId);

  const io = getIO();

  io.to([senderId, receiverId]).emit("message_deleted", {
    messageId,
  });
};

const editMessage = async (messageId, text) => {
  let message = await MessagesModel.findById(messageId);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  message.text = text;
  message.isEdited = true;

  await message.save();

  message = await MessagesModel.findById(message._id)
    .populate("senderId", "fullname name email avatar")
    .populate("replyTo", "text")
    .populate("reactions.userId", "fullname");

  const io = getIO();

  io.to([message.senderId.toString(), message.receiverId.toString()]).emit(
    "message_edited",
    {
      message,
    },
  );

  return message;
};

module.exports = {
  sendMessage,
  getConversation,
  addReaction,
  replyToMessage,
  deleteMessage,
  editMessage,
};
