const AdminLogModel = require("../models/AdminLogModel");
const AppError = require("../utils/AppError");

const addAdminLog = async (logData) => {
    const addedAdminLog = await AdminLogModel.create(logData);
    return addedAdminLog;
};

const getAdminLogs = async () => {
    const logs = await AdminLogModel.find().populate("adminId", "fullname email").sort({ createdAt: -1 }).limit(20);
    return logs;
};

module.exports = {
    addAdminLog,
    getAdminLogs,
};