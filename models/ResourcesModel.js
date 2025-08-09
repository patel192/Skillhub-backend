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
    type:{
      type:String,
      enum:["note","code"]
    },
    content: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Resources", ResourcesSchema);
