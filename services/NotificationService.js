const NotificationModel = require("../models/NotificationModel");
const AppError = require("../utils/AppError");

const getNotificationsForUser = async (userId) => {
  const notifications = await NotificationModel.find({
    userId,
  }).sort({
    createdAt: -1,
  });

  return notifications;
};

const markAsRead = async (notificationId) => {
  const notification = await NotificationModel.findByIdAndUpdate(
    notificationId,
    {
      read: true,
    },
    {
      new: true,
    },
  );

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  return notification;
};

module.exports = {
  getNotificationsForUser,
  markAsRead,
};
