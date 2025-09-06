const FreindsModel = require("../models/FriendsModel")
const SendFreindRequest = async (req,res) =>{
    try {
    const { requesterId, recipientId } = req.body;

    const existing = await FreindsModel.findOne({
      requester: requesterId,
      recipient: recipientId,
    });

    if (existing) return res.status(400).json({ message: "Request already sent" });

    const request = await FreindsModel.create({ requester: requesterId, recipient: recipientId });
    res.status(201).json({ message: "Request sent", data: request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
} 
const AcceptorRejectFriendRequest = async (req,res) => {
    try {
    const { status } = req.body; // "accepted" or "rejected"
    const request = await FreindsModel.findByIdAndUpdate(
      req.params.requestId,
      { status },
      { new: true }
    );
    res.json({ message: `Request ${status}`, data: request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const GetFriendsList = async (req,res) => {
    try {
    const { userId } = req.params;
    const friendships = await FreindsModel.find({
      $or: [{ requester: userId }, { recipient: userId }],
      status: "accepted",
    }).populate("requester recipient", "fullname avatar");

    const friends = friendships.map(f =>
      String(f.requester._id) === String(userId) ? f.recipient : f.requester
    );

    res.json({ data: friends });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const GetIncomingFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await FreindsModel.find({
      recipient: userId,
      status: "pending",
    }).populate("requester", "fullname avatar email");

    res.json({ data: requests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {SendFreindRequest,AcceptorRejectFriendRequest,GetFriendsList,GetIncomingFriendRequests}