const MessagesModel = require("../models/MessagesModel");
const SendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text, replyTo } = req.body;

    const message = await MessagesModel.create({
      senderId,
      receiverId,
      text,
      replyTo: replyTo || null,
    });

    res.status(201).json({ success: true, message });
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
      .populate("senderId", "name email") // sender details
      .populate("replyTo", "text") // include replied message text
      .populate("reactions.userId", "fullname") // 👈 populate reactions with user fullname
      .sort({ createdAt: 1 }); // oldest → newest

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

    const existing = message.reactions.find(
      (r) => r.userId.toString() === userId
    );
    if (existing) {
      existing.emoji = emoji;
    } else {
      message.reactions.push({ userId, emoji });
    }

    await message.save();

    // repopulate so frontend gets fullname inside reactions
    message = await message.populate("reactions.userId", "fullname");

    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const ReplyToMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const { id } = req.params; // message being replied to

    const replyMessage = await MessagesModel.create({
      senderId,
      receiverId,
      text,
      replyTo: id,
    });

    res.json({ success: true, replyMessage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const DeleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted" });
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
};
