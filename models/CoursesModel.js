const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
  },
  description: {
    type: String,
    required: [true, "Course description is required"],
  },
  instructor: {
    type: String,
    required: [true, "Instructor name is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Web Development", "Data Science", "Design", "Marketing", "Other","AI"],
    default: "Other",
  },
  duration: {
    type: String, // e.g., "10 hours"
    required: true,
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
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
