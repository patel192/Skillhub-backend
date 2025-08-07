const BlogsModel = require("../models/BlogsModel");
const AddBlog = async (req, res) => {
  try {
    const AddedBlog = await BlogsModel.create(req.body);
    res.status(200).json({
      message: "Blog Added Successfully",
      data: AddedBlog,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
module.exports = {
    AddBlog
}