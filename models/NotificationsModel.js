const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const NotificationsSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  type: {
    type:String,
    enum:["event", "feedback", "certificate", "achievement"],
    required: [true, "Notification type is required"]
  },
  read:{
    type: Boolean,
    default: false,
  }
},{
    timestamps: true
});
module.exports = mongoose.model("Notifications",NotificationsSchema)
