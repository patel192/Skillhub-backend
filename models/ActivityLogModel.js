const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ActivityLogSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
  }, // e.g. ENROLLED, POST_CREATED
  targetType: {
    type: String,
  }, // Course, Community, Post
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
  }, // reference
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("ActivityLog",ActivityLogSchema)