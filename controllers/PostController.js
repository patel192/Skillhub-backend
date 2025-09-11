const Post = require("../models/PostModel");
const eventEmitter = require("../events/EventEmitter");
// Create a post
const createPost = async (req, res) => {
  try {
    const { userId, communityId, content } = req.body;
    const post = await Post.create({ userId, communityId, content });
    eventEmitter.emit("post-cretaed", {
      userId: post.userId,
      postId: post._id,
    });
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name email")
      .populate("communityId", "name");
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "name email")
      .populate("comments.userId", "name email");
    if (!post)
      return res.status(404).json({ success: false, error: "Post not found" });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Like/unlike post
const toggleLike = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ success: false, error: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);
    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    eventEmitter.emit("post-Liked", { post, likedBy: userId });

    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Add comment
const addComment = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ success: false, error: "Post not found" });

    post.comments.push({ userId, content });
    await post.save();
    eventEmitter.emit("post-Commented", {
      post,
      comment: content,
      commentedBy: userId,
    });

    await post.populate("comments.userId", "name email");

    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const post = await Post.findOneAndUpdate(
      { "comments._id": commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get posts by community
const getCommunityPosts = async (req, res) => {
  try {
    const posts = await Post.find({ communityId: req.params.communityId })
      .populate("userId", "fullname email")
      .populate("comments.userId", "fullname email");
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get posts by user
const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId })
      .populate("communityId", "name")
      .populate("comments.userId", "fullname email");
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const AddCommentReply = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post)
      return res.status(404).json({
        success: false,
        error: "Post Not Found",
      });
    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        error: "Comment Not Found",
      });
    }
    comment.replies.push({ userId, content });
    await post.save();
    await post.populate("comments.userId", "fullname");
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "inter Server Error",
    });
  }
};
module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
  getCommunityPosts,
  getUserPosts,
  AddCommentReply
};
