const User = require("../models/UserModel");
const Enrollment = require("../models/EnrollmentModel");
const Certificate = require("../models/CertificatesModel");
const Post = require("../models/PostModel");
const Community = require("../models/CommunityModel");
const Course = require("../models/CoursesModel")
const Overview = async(req,res) => {
    try {
    // --- Stats ---
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalPublished = await Course.countDocuments({ isPublished: true });
    const totalUnpublished = await Course.countDocuments({ isPublished: false });
    const totalEnrollments = await Enrollment.countDocuments();
    const totalCertificates = await Certificate.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalCommunities = await Community.countDocuments();

    // --- Latest 5 Users & Courses ---
    const latestUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const latestCourses = await Course.find().sort({ createdAt: -1 }).limit(5);

    // --- Enrollment trends (group by month) ---
    const enrollmentTrends = await Enrollment.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const formattedTrends = enrollmentTrends.map((item) => ({
      month: monthNames[item._id - 1],
      count: item.count,
    }));

    res.json({
      stats: {
        totalUsers,
        totalCourses,
        totalPublished,
        totalUnpublished,
        totalEnrollments,
        totalCertificates,
        totalPosts,
        totalCommunities,
      },
      latestUsers,
      latestCourses,
      enrollmentTrends: formattedTrends,
    });
  } catch (error) {
    console.error("Error in /admin/overview:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}
module.exports = {Overview}