const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnalyticsSchema = Schema(
  {
    type: {
      type: String,
      enum: ["USER", "COURSE", "REVENUE", "ENGAGEMENT"],
      required: true,
    }, // what category the metric belongs to

    metric: {
      type: String,
      required: true,
    }, // e.g., "new_users", "active_users", "courses_published", "monthly_revenue"

    value: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", AnalyticsSchema);
