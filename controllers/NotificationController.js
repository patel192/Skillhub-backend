const NotificationModel = require("../models/NotificationsModel")
const AddNotification = async (req, res) => {
    try{
   const AddedNotification = await NotificationModel.create(req.body)
   res.status(200).json({
            message: "Notification Added Successfully",
            data: AddedNotification
   })
    }catch(err){
   res.status(500).json({
        message: err.message || "Internal Server Error"
   })
    }
}
module.exports = {
    AddNotification
}