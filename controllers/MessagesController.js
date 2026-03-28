const MessagesModel = require("../models/MessagesModel");
const { emitToUser, getIO } = require("../socket");

const SendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text, replyTo } = req.body;

    const message = await MessagesModel.create({
      senderId,
      receiverId,
      text,
      replyTo: replyTo || null,
      read: false
    });

    // Populate for response
    const populatedMessage = await MessagesModel.findById(message._id)
      .populate("senderId", "fullname name email avatar")
      .populate("replyTo", "text")
      .populate("reactions.userId", "fullname");

    // Emit to receiver via Socket.IO if they're online
    const io = getIO();
    io.to(receiverId.toString()).emit("new_message", {
      message: populatedMessage
    });

    res.status(201).json({ success: true, message: populatedMessage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const GetConversations = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;

    const messages = await MessagesModel.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    })
      .populate("senderId", "name email fullname avatar")
      .populate("replyTo", "text senderId")
      .populate("reactions.userId", "fullname")
      .sort({ createdAt: 1 });

    // Mark unread messages as read
    await MessagesModel.updateMany(
      { senderId: otherUserId, receiverId: userId, read: false },
      { read: true }
    );

    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const AddReaction = async (req, res) => {
  try {
    const { userId, emoji } = req.body;
    const { id } = req.params;

    let message = await MessagesModel.findById(id);
    if (!message)
      return res
        .status(404)
        .json({ success: false, error: "Message not found" });

    const existingIndex = message.reactions.findIndex(
      (r) => r.userId.toString() === userId
    );

    if (existingIndex >= 0) {
      if (message.reactions[existingIndex].emoji === emoji) {
        message.reactions.splice(existingIndex, 1);
      } else {
        message.reactions[existingIndex].emoji = emoji;
      }
    } else {
      message.reactions.push({ userId, emoji });
    }

    await message.save();
    message = await message.populate("reactions.userId", "fullname");

    // Emit update to conversation participants
    const io = getIO();
    const room = [message.senderId.toString(), message.receiverId.toString()];
    io.to(room).emit("reaction_updated", { message });

    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const ReplyToMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const { id } = req.params;

    const replyMessage = await MessagesModel.create({
      senderId,
      receiverId,
      text,
      replyTo: id,
    });

    const populatedMessage = await MessagesModel.findById(replyMessage._id)
      .populate("senderId", "fullname name email avatar")
      .populate("replyTo", "text");

    // Emit to receiver
    const io = getIO();
    io.to(receiverId.toString()).emit("new_message", {
      message: populatedMessage
    });

    res.json({ success: true, replyMessage: populatedMessage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const DeleteMessage = async (req, res) => {
  try {
    const message = await MessagesModel.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, error: "Message not found" });
    }

    const { senderId, receiverId } = message;
    await MessagesModel.findByIdAndDelete(req.params.id);

    // Emit deletion to both users
    const io = getIO();
    io.to([senderId.toString(), receiverId.toString()]).emit("message_deleted", {
      messageId: req.params.id
    });

    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// New: Edit message via HTTP (fallback)
const EditMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;

    let message = await MessagesModel.findById(id);
    if (!message) {
      return res.status(404).json({ success: false, error: "Message not found" });
    }

    message.text = text;
    message.isEdited = true;
    await message.save();

    const populatedMessage = await MessagesModel.findById(message._id)
      .populate("senderId", "fullname name email avatar")
      .populate("replyTo", "text")
      .populate("reactions.userId", "fullname");

    // Emit update
    const io = getIO();
    io.to([message.senderId.toString(), message.receiverId.toString()])
      .emit("message_edited", { message: populatedMessage });

    res.json({ success: true, message: populatedMessage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  SendMessage,
  GetConversations,
  AddReaction,
  ReplyToMessage,
  DeleteMessage,
  EditMessage
};