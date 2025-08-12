const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChallengesSchema = Schema({
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Challenge title is required"],
    },
    description: {
      type: String,
      required: [true, "Challenge description is required"],
    },
    starterCode: {
      type: String, 
    },
    solutionCode: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    }},{
    timestamps:true
})
module.exports  = mongoose.model("Challenges",ChallengesSchema);