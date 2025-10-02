const router = require("express").Router();
const communityController = require("../controllers/CommunityController");
const authMiddleware = require("../middleware/authMiddleware")

// CRUD
router.post("/",authMiddleware.verifyToken, communityController.createCommunity);
router.get("/",communityController.getCommunities);
router.get("/:id",communityController.getCommunity);
router.put("/:id",authMiddleware.verifyToken,communityController.updateCommunity);
router.delete("/:id",authMiddleware.verifyToken,communityController.deleteCommunity);

// Membership
router.patch("/:id/join",authMiddleware.verifyToken,communityController.joinCommunity);
router.patch("/:id/leave",authMiddleware.verifyToken,communityController.leaveCommunity);

// Roles
router.patch("/:id/promote",authMiddleware.verifyToken,communityController.promoteToAdmin);

// Pinned posts
router.patch("/:id/pin",authMiddleware.verifyToken,communityController.pinPost);
router.patch("/:id/unpin",authMiddleware.verifyToken,communityController.unpinPost);

// Posts inside community
router.get("/:id/posts",authMiddleware.verifyToken,communityController.getCommunityPosts);

module.exports = router;
