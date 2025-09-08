// controllers/AdminLogController.js
const AdminLogModel = require("../models/AdminLogModel");

// Add a new admin log
const AddAdminLog = async (req, res) => {
  try {
    const AddedAdminLog = await AdminLogModel.create(req.body);
    res.status(201).json({
      message: "Admin Log Added Successfully",
      data: AddedAdminLog,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

// Get latest admin logs
const GetAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLogModel.find()
      .populate("adminId", "fullname email")
      .sort({ createdAt: -1 })
      .limit(20); // fetch last 20 actions
    res.status(200).json({ logs });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = {
  AddAdminLog,
  GetAdminLogs,
};
