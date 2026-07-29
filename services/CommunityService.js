const Community = require("../models/CommunityModel");
const Post = require("../models/PostModel");
const AppError = require("../utils/AppError");

const createCommunity = async (communityData) => {
  const { name, description, coverImage, userId } = communityData;
  if (!userId) {
    throw new AppError("userId is required", 400);
  }

  const community = await Community.create({
    name,
    description,
    coverImage,
    createdBy: userId,
    members: [
      {
        userId,
        role: "admin",
      },
    ],
  });
  return community;
};

const getCommunities = async () => {
  return await Community.find()
    .populate("createdBy", "name email")
    .populate("members.userId", "name email");
};

const getCommunity = async (communityId) => {
  const community = await Community.findById(communityId)
    .populate("createdBy", "fullname email")
    .populate("members.userId", "fullname email")
    .populate("pinnedPosts");

  if (!community) {
    throw new AppError("Community not found", 404);
  }

  return community;
};

const updateCommunity = async (communityId, updateData) => {
  const { name, description, coverImage, userId } = updateData;

  const community = await Community.findById(communityI);
  if (!community) {
    throw new AppError("Community not found", 404);
  }

  const member = community.members.find((m) => m.userId.toString() === userId);
  if (!member || member.role !== "admin") {
    throw new AppError("Not authorized", 403);
  }

  community.name = name || community.name;
  community.description = description || community.description;
  community.coverImage = coverImage || community.coverImage;

  await community.save();
  return community;
};

const deleteCommunity = async (communityId) => {
  const community = await Community.findByIdAndDelete(communityId);
  if (!community) {
    throw new AppError("Community not found", 404);
  }
  return community;
};

const joinCommunity = async (communityId, userId) => {
  const community = await Community.findById(communityId);
  if (!community) {
    throw new AppError("Community not found", 404);
  }

  const alreadyMember = community.members.some(
    (member) => member.userId.toString() === userId,
  );
  if (alreadyMember) {
    throw new AppError("Already a member", 400);
  }

  community.members.push({userId,role: "member",});
  await community.save();
  return community;
};

const leaveCommunity = async (communityId, userId) => {
    const community = await Community.findById(communityId);
    if (!community) {
        throw new AppError("Community not found", 404);
    }

    community.members = community.members.filter(
        (member) => member.userId.toString() !== userId
    );

    await community.save();
    return community;
};

const promoteToAdmin = async (communityId, userId) => {
    const community = await Community.findById(communityId);
    if (!community) {
        throw new AppError("Community not found", 404);
    }

    const member = community.members.find(
        (member) => member.userId.toString() === userId
    );
    if (!member) {
        throw new AppError("User not a member", 404);
    }

    member.role = "admin";
    await community.save();
    return community;
};

const pinPost = async (communityId, postId) => {
    const community = await Community.findById(communityId);
    if (!community) {
        throw new AppError("Community not found", 404);
    }

    if (!community.pinnedPosts.includes(postId)) {
        community.pinnedPosts.push(postId);
        await community.save();
    }
    return community;
};

const unpinPost = async (communityId, postId) => {
    const community = await Community.findById(communityId);
    if (!community) {
        throw new AppError("Community not found", 404);
    }
    community.pinnedPosts = community.pinnedPosts.filter(
        (post) => post.toString() !== postId.toString()
    );

    await community.save();
    return community;
};

const getCommunityPosts = async (communityId,queryParams) => {
    const page = Math.max(parseInt(queryParams.page || "1", 10),1);

    const limit = Math.min(Math.max(parseInt(queryParams.limit || "10", 10),1),100);

    const sort = (queryParams.sort || "new").toLowerCase();

    const q = queryParams.q?.trim();

    const community = await Community.findById(communityId);
    if (!community) {
        throw new AppError("Community not found",404);
    }

    const filter = {communityId,};
    if (q) {
        filter.content = {
            $regex: q,
            $options: "i",
        };
    }

    const skip = (page - 1) * limit;

    let query = Post.find(filter)
        .populate("userId", "fullname avatar")
        .populate("comments.userId", "fullname avatar")
        .skip(skip)
        .limit(limit);

    if (sort === "new") {
        query = query.sort({
            createdAt: -1,
        });
    }

    if (sort === "old") {
        query = query.sort({
            createdAt: 1,
        });
    }

    const [total, rawPosts] = await Promise.all([
        Post.countDocuments(filter),
        query,
    ]);

    let posts = rawPosts;

    if (sort === "top") {
        posts = [...rawPosts].sort(
            (a, b) =>
                (b.likes?.length || 0) -
                (a.likes?.length || 0)
        );
    }

    const pinnedIds = (community.pinnedPosts || []).map(String);

    const orderedPosts = [
        ...posts.filter((post) =>
            pinnedIds.includes(String(post._id))
        ),
        ...posts.filter(
            (post) =>
                !pinnedIds.includes(String(post._id))
        ),
    ];

    const shapedPosts = orderedPosts.map((post) => ({
        ...post.toObject(),
        likeCount: post.likes?.length || 0,
        commentCount: post.comments?.length || 0,
        isPinned: pinnedIds.includes(
            String(post._id)
        ),
    }));

    return {
        community: {
            _id: community._id,
            name: community.name,
            description: community.description,
            memberCount:
                community.members?.length || 0,
            pinnedCount:
                community.pinnedPosts?.length || 0,
        },
        page,
        limit,
        total,
        count: shapedPosts.length,
        posts: shapedPosts,
    };
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
  getCommunityPosts
}
