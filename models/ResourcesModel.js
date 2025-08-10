const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ResourcesSchema = Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
      required:[true,"The Content is Required"]
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Resources", ResourcesSchema);
