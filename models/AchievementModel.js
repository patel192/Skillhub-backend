const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AchievementSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    pointsRequired: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Achievement", AchievementSchema);
