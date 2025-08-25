const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProgressSchema = Schema({
  userId: {
    type:Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  currentQuestionIdx: {
    type: Number,
    default: 0,
  },
  quizAnswers: {
    type: Map,
    of: String, 
    default: {},
  },
  points: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Progress",ProgressSchema)