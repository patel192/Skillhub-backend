const NotificationService = require("../services/NotificationService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const AllNotificationForUser = catchAsync(async (req, res) => {
  const notifications = await NotificationService.getNotificationsForUser(
    req.params.userId,
  );

  return ResponseHandler.success(
    res,
    "Notifications fetched successfully",
    notifications,
  );
});

const ReadMessage = catchAsync(async (req, res) => {
  const notification = await NotificationService.markAsRead(req.params.id);

  return ResponseHandler.success(
    res,
    "Notification marked as read",
    notification,
  );
});

module.exports = {
  AllNotificationForUser,
  ReadMessage,
};
