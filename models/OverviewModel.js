const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OverviewSchema = Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    overview: {
      type: [String], // array of strings
      required: [true, "Course overview is required"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Overview", OverviewSchema);
