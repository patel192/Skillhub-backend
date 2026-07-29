const Community = require("../models/CommunityModel");
const CommunityService = require("../services/CommunityService");
const ResponseHandler = require("../utils/ResponseHandler");
const Post = require("../models/PostModel");

const createCommunity = catchAsync(async (req, res) => {
  const community = await CommunityService.createCommunity(req.body);
  return ResponseHandler.success(res,"Community created successfully",201);
});

const getCommunities = catchAsync(async (req, res) => {

    const communities = await CommunityService.getCommunities();
    return ResponseHandler.success(res,"COmmunities fetched successfully",communities);
});

const getCommunity = catchAsync(async (req, res) => {
    const community =await CommunityService.getCommunity(req.params.id);
    return ResponseHandler.success(res,"Community fetched successfully",community);
});

const updateCommunity = catchAsync(async (req, res) => {
    const community = await CommunityService.updateCommunity(req.params.id,req.body);
    return ResponseHandler.success(res,"Community updated successfully",community);
});

const deleteCommunity = catchAsync(async (req, res) => {
    await CommunityService.deleteCommunity(req.params.id);
    return ResponseHandler.success(res,"Community deleted successfully");
});

const joinCommunity = catchAsync(async (req, res) => {
    const community =await CommunityService.joinCommunity(req.params.id,req.body.userId);
    return ResponseHandler.success(res,"Joined community successfully",community);
});

const leaveCommunity = catchAsync(async (req, res) => {
    const community =await CommunityService.leaveCommunity(req.params.id,req.body.userId);
    return ResponseHandler.success(res,"Left community successfully",community);
});

const promoteToAdmin = catchAsync(async (req, res) => {
    const community =await CommunityService.promoteToAdmin(req.params.id,req.body.userId);
    return ResponseHandler.success(res,"Member promoted successfully",community);
});

const pinPost = catchAsync(async (req, res) => {
    const community = await CommunityService.pinPost(req.params.id,req.body.postId);
    return ResponseHandler.success(res,"Post pinned successfully",community);
});

const unpinPost = catchAsync(async (req, res) => {
    const community = await CommunityService.unpinPost(req.params.id,req.body.postId);
    return ResponseHandler.success(res,"Post unpinned successfully",community);
});

const getCommunityPosts = catchAsync(async (req, res) => {
    const posts = await CommunityService.getCommunityPosts(req.params.id,req.query);
    return ResponseHandler.success(res,"Community posts fetched successfully",posts);
});

module.exports = {
  createCommunity,
  getCommunities,
  getCommunity,
  updateCommunity,
  deleteCommunity,
  joinCommunity,
  leaveCommunity,
  promoteToAdmin,
  pinPost,
  unpinPost,
  getCommunityPosts,
};
