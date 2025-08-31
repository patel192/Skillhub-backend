const router = require("express").Router();
const communityController = require("../controllers/CommunityController");

// CRUD
router.post("/", communityController.createCommunity);
router.get("/", communityController.getCommunities);
router.get("/:id", communityController.getCommunity);
router.put("/:id", communityController.updateCommunity);
router.delete("/:id", communityController.deleteCommunity);

// Membership
router.patch("/:id/join", communityController.joinCommunity);
router.patch("/:id/leave", communityController.leaveCommunity);

// Roles
router.patch("/:id/promote", communityController.promoteToAdmin);

// Pinned posts
router.patch("/:id/pin", communityController.pinPost);
router.patch("/:id/unpin", communityController.unpinPost);

// Posts inside community
router.get("/:id/posts", communityController.getCommunityPosts);

module.exports = router;
