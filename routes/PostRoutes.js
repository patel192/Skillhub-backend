const router = require("express").Router();
const postController = require("../controllers/PostController");

// CRUD
router.post("/", postController.createPost);       // Create post
router.get("/", postController.getPosts);          // Get all posts
router.get("/:id", postController.getPost);        // Get single post
router.put("/:id", postController.updatePost);     // Update post
router.delete("/:id", postController.deletePost);  // Delete post

// Likes
router.post("/:id/like", postController.toggleLike);  // Like / Unlike

// Comments
router.post("/:id/comment", postController.addComment); // Add comment
router.delete("/comment/:commentId", postController.deleteComment); // Delete comment
router.post("/:postId/comment/:commentId/reply",postController.AddCommentReply)

// Extra filters
router.get("/community/:communityId", postController.getCommunityPosts); // Posts in community
router.get("/user/:userId", postController.getUserPosts);                // Posts by user

module.exports = router;
