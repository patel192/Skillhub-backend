const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CoursesSchema = Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  instructor: {
    type: String,
  },
  thumbnail: {
    type: String,
    default: "", // You can store URL or path
  },
  category: {
    type: String,
    enum: ["Web Development", "Data Science", "AI", "Design", "Marketing"],
    required: true,
  },
  duration: {
    type: String, // e.g., "6 weeks", "10 hours"
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  price: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Courses", CoursesSchema);
