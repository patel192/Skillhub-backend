const router = require("express").Router()
const communityController = require("../controllers/CommunityController")
router.post("/", communityController.createCommunity);         // Create
router.get("/", communityController.getCommunities);           // Get all
router.get("/:id", communityController.getCommunity);          // Get one
router.put("/:id", communityController.updateCommunity);       // Update
router.delete("/:id", communityController.deleteCommunity);    // Delete

// Membership
router.post("/:id/join", communityController.joinCommunity);
router.post("/:id/leave", communityController.leaveCommunity);

//  Roles
router.post("/:id/promote", communityController.promoteToAdmin);

//  Pinned posts
router.post("/:id/pin", communityController.pinPost);
router.post("/:id/unpin", communityController.unpinPost)
module.exports = router