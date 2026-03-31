const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSettingsSchema = new Schema(
   {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    profilePublic: {
      type: Boolean,
      default: false
    },

    showActivity: {
      type: Boolean,
      default: true
    },

    showProgress: {
      type: Boolean,
      default: true
    },

    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "dark"
    },

    animationsEnabled: {
      type: Boolean,
      default: true
    },

    compactMode: {
      type: Boolean,
      default: false
    },

    emailNotifications: {
      type: Boolean,
      default: true
    },

    pushNotifications: {
      type: Boolean,
      default: true
    },

    courseUpdates: {
      type: Boolean,
      default: true
    },

    achievementAlerts: {
      type: Boolean,
      default: true
    },

    marketingEmails: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("UserSettings", UserSettingsSchema);
