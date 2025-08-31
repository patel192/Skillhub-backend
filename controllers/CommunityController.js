const Community = require("../models/CommunityModel")
const Post = require("../models/PostModel")
const createCommunity = async (req, res) => {
  try {
    const { name, description, coverImage, userId } = req.body;

    const community = await Community.create({
      name,
      description,
      coverImage,
      createdBy: userId,
      members: [{ userId, role: "admin" }], // creator is admin
    });

    res.status(201).json({ success: true, data: community });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get All Communities
const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find()
      .populate("createdBy", "name email")
      .populate("members.userId", "name email");

    res.json({ success: true, data: communities });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get Single Community
const getCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const community = await Community.findById(id)
      .populate("createdBy", "name email")
      .populate("members.userId", "name email")
      .populate("pinnedPosts");

    if (!community) return res.status(404).json({ success: false, error: "Community not found" });

    res.json({ success: true, data: community });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Update Community
const updateCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, coverImage } = req.body;

    const updated = await Community.findByIdAndUpdate(
      id,
      { name, description, coverImage },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Delete Community
const deleteCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    await Community.findByIdAndDelete(id);
    res.json({ success: true, message: "Community deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Join Community
const joinCommunity = async (req, res) => {
  try {
    const { id } = req.params; // communityId
    const { userId } = req.body;

    const community = await Community.findById(id);
    if (!community) return res.status(404).json({ success: false, error: "Community not found" });

    if (community.members.some((m) => m.userId.toString() === userId)) {
      return res.status(400).json({ success: false, error: "Already a member" });
    }

    community.members.push({ userId, role: "member" });
    await community.save();

    res.json({ success: true, data: community });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Leave Community
const leaveCommunity = async (req, res) => {
  try {
    const { id } = req.params; // communityId
    const { userId } = req.body;

    const community = await Community.findById(id);
    if (!community) return res.status(404).json({ success: false, error: "Community not found" });

    community.members = community.members.filter((m) => m.userId.toString() !== userId);
    await community.save();

    res.json({ success: true, data: community });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Promote Member to Admin
const promoteToAdmin = async (req, res) => {
  try {
    const { id } = req.params; // communityId
    const { userId } = req.body;

    const community = await Community.findById(id);
    if (!community) return res.status(404).json({ success: false, error: "Community not found" });

    const member = community.members.find((m) => m.userId.toString() === userId);
    if (!member) return res.status(404).json({ success: false, error: "User not a member" });

    member.role = "admin";
    await community.save();

    res.json({ success: true, data: community });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Pin Post in Community
const pinPost = async (req, res) => {
  try {
    const { id } = req.params; // communityId
    const { postId } = req.body;

    const community = await Community.findById(id);
    if (!community) return res.status(404).json({ success: false, error: "Community not found" });

    if (!community.pinnedPosts.includes(postId)) {
      community.pinnedPosts.push(postId);
      await community.save();
    }

    res.json({ success: true, data: community });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Unpin Post
const unpinPost = async (req, res) => {
  try {
    const { id } = req.params; // communityId
    const { postId } = req.body;

    const community = await Community.findById(id);
    if (!community) return res.status(404).json({ success: false, error: "Community not found" });

    community.pinnedPosts = community.pinnedPosts.filter(
      (p) => p.toString() !== postId.toString()
    );
    await community.save();

    res.json({ success: true, data: community });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
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
}