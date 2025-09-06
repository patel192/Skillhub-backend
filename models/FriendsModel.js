const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FriendsSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // who sent request
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // who received request
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});
module.exports = mongoose.model("Friend",FriendsSchema)