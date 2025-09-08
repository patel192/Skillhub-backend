// models/AdminLogModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminLogSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: [true, "Action is required"],
      enum: [
        "CREATE_COURSE",
        "DELETE_COURSE",
        "PUBLISH_BLOG",
        "DELETE_USER",
        "UPDATE_SETTINGS",
        "OTHER",
      ],
      default: "OTHER",
    },
    details: {
      type: String,
      required: [true, "Details are required"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminLog", AdminLogSchema);
