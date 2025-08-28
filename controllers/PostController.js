const PostModel = require("../models/PostModel");
const AddPost = async (req, res) => {
  try {
    const NewPost = await PostModel.create(req.body);
    res.status(200).json({
      success: true,
      message: "Post Created Successfully",
      data: NewPost,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetPost = async (req, res) => {
  try {
    const Posts = await PostModel.find();
    res.status(200).json({
      success: true,
      message: "Posts Fetched Successfully",
      data: Posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const PostLike = async (req, res) => {
  try {
    const { userId } = req.body;
    const Post = await PostModel.findById(req.params.id);
    if (!Post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    const index = Post.likes.indexOf(userId);
    if (index === -1) {
      Post.likes.push(userId);
    } else {
      Post.likes.splice(index, 1);
    }
    await Post.save();
    res.status(200).json({
      success: true,
      likes: Post.likes.length,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const PostComment = async (req, res) => {
  try {
    const { userId } = req.body;
    const Post = await PostModel.findById(req.params.id);
    if (!Post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    Post.comments.push({
      userId: userId,
      content: req.body.content,
    });
    await Post.save();
    res.status(200).json({
      success: true,
      comments: Post.comments.length,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const GetCommentsForPost = async (req, res) => {
  try {
    const Post = await PostModel.findById(req.params.id).populate(
      "comments.userId , fullname avatar"
    );
    if (!Post) {
      res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    res.status(200).json({
      success: true,
      comments: Post.comments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  AddPost,
  GetPost,
  PostLike,
  PostComment,
  GetCommentsForPost
};
