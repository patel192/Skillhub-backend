const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ---- Comment Schema ----
const CommentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  replies: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

// ---- Reaction Schema ----
const ReactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
});

// ---- Post Schema ----
const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  communityId: {
    type: Schema.Types.ObjectId,
    ref: "Community",  // ✅ Link post to a community
    required: false,   // post can be outside community too (like global feed)
  },
  content: {
    type: String,
    required: true,
  },
  media: [String], // optional (images, videos, etc.)
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reactions: [ReactionSchema], // ✅ supports multiple emoji
  comments: [CommentSchema],
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
