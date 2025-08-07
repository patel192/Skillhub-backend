const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategoriesSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    icon: {
      type: String,
      required: [true, "Category icon is required"],
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Category", CategoriesSchema);
