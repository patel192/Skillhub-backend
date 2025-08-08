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
  categoryId:{
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category ID is required"],
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
  imageUrl: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
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
  language:{
    type:String,
    enum: ["English", "Spanish", "French", "German", "Other"],
    default: "English",
  },
  tags:{
    type:String,
    default:""
  },
  content:{

  },
  rating:{
      type:Number,
      default: 0
    },
    enrollemntCount:{
    type:Number,
    default: 0
    },
  isPublished: {
    type: Boolean,
    default: false,
  },
   resources: {
    notes: [{ type: String }],
    codeSnippets: [{ type: String }],
    attachments: [{ type: String }],
    videos: [{ type: String }]
  }
});

module.exports = mongoose.model("Course", CourseSchema);
