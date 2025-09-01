const NotificationModel = require("../models/NotificationsModel");
const AllNotificationForUser = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const ReadMessage = async (req, res) => {
  try {
    const ReadedMessage = await NotificationModel.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.status(200).json({
      message: "Message Readed Successfully",
      data: ReadedMessage,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
module.exports = {
  AllNotificationForUser,
  ReadMessage,
};
