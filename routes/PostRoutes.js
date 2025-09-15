const router = require("express").Router();
const postController = require("../controllers/PostController");
const authMiddleware = require("../middleware/authMiddleware")
// CRUD
router.post("/",authMiddleware.verifyToken,postController.createPost);       // Create post
router.get("/",authMiddleware.verifyToken,postController.getPosts);          // Get all posts
router.get("/:id",authMiddleware.verifyToken,postController.getPost);        // Get single post
router.put("/:id",authMiddleware.verifyToken,postController.updatePost);     // Update post
router.delete("/:id",authMiddleware.verifyToken,postController.deletePost);  // Delete post

// Likes
router.post("/:id/like",authMiddleware.verifyToken,postController.toggleLike);  // Like / Unlike

// Comments
router.post("/:id/comment",authMiddleware.verifyToken,postController.addComment); // Add comment
router.delete("/comment/:commentId",authMiddleware.verifyToken,postController.deleteComment); // Delete comment
router.post("/:postId/comment/:commentId/reply",authMiddleware.verifyToken,postController.AddCommentReply)

// Extra filters
router.get("/community/:communityId",authMiddleware.verifyToken,postController.getCommunityPosts); // Posts in community
router.get("/user/:userId",authMiddleware.verifyToken,postController.getUserPosts);                // Posts by user

module.exports = router;
