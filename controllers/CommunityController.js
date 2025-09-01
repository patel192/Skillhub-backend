const Community = require("../models/CommunityModel");
const Post = require("../models/PostModel");

// ✅ Create Community
const createCommunity = async (req, res) => {
  try {
    const { name, description, coverImage, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, error: "userId is required" });
    }

    const community = await Community.create({
      name,
      description,
      coverImage,
      createdBy: userId,
      members: [{ userId, role: "admin" }],
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
      .populate("createdBy", "fullname email")
      .populate("members.userId", "fullname email")
      .populate("pinnedPosts");

    if (!community) {
      return res.status(404).json({ success: false, error: "Community not found" });
    }

    res.json({ success: true, data: community });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Update Community (only admin)
const updateCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, coverImage, userId } = req.body;

    const community = await Community.findById(id);
    if (!community) return res.status(404).json({ success: false, error: "Community not found" });

    const member = community.members.find((m) => m.userId.toString() === userId);
    if (!member || member.role !== "admin") {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    community.name = name || community.name;
    community.description = description || community.description;
    community.coverImage = coverImage || community.coverImage;

    await community.save();

    res.json({ success: true, data: community });
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
    const { id } = req.params;
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
    const { id } = req.params;
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
    const { id } = req.params;
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

// ✅ Pin Post
const pinPost = async (req, res) => {
  try {
    const { id } = req.params;
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
    const { id } = req.params;
    const { postId } = req.body;

    const community = await Community.findById(id);
    if (!community) return res.status(404).json({ success: false, error: "Community not found" });

    community.pinnedPosts = community.pinnedPosts.filter((p) => p.toString() !== postId.toString());
    await community.save();

    res.json({ success: true, data: community });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get Community Posts
const getCommunityPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 100);
    const sort = (req.query.sort || "new").toLowerCase();
    const q = req.query.q?.trim();

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }

    const filter = { communityId: id };
    if (q) filter.content = { $regex: q, $options: "i" };

    const skip = (page - 1) * limit;
    let query = Post.find(filter)
      .populate("userId", "fullname avatar")
      .populate("comments.userId", "fullname avatar")
      .skip(skip)
      .limit(limit);

    if (sort === "new") query = query.sort({ createdAt: -1 });
    if (sort === "old") query = query.sort({ createdAt: 1 });

    const [total, rawPosts] = await Promise.all([Post.countDocuments(filter), query]);

    let posts = rawPosts;
    if (sort === "top") {
      posts = [...rawPosts].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    }

    const pinnedIds = (community.pinnedPosts || []).map(String);
    const ordered = [
      ...posts.filter((p) => pinnedIds.includes(String(p._id))),
      ...posts.filter((p) => !pinnedIds.includes(String(p._id))),
    ];

    const shaped = ordered.map((p) => ({
      ...p.toObject(),
      likeCount: p.likes?.length || 0,
      commentCount: p.comments?.length || 0,
      isPinned: pinnedIds.includes(String(p._id)),
    }));

    return res.json({
      success: true,
      data: {
        community: {
          _id: community._id,
          name: community.name,
          description: community.description,
          memberCount: community.members?.length || 0,
          pinnedCount: community.pinnedPosts?.length || 0,
        },
        page,
        limit,
        total,
        count: shaped.length,
        posts: shaped,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
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
  getCommunityPosts,
};
