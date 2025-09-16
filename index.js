require("dotenv").config();
require("./events/listners");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/UserRoutes");
const courseRoutes = require("./routes/CourseRoutes");
const achievementRoutes = require("./routes/AchievementRoutes");
const analyticsRoutes = require("./routes/AnalyticsRoutes");
const adminlogRoutes = require("./routes/AdminLogRoutes");
const blogsRoutes = require("./routes/BlogsRoutes");
const categoryRoutes = require("./routes/CategoriesRoutes");
const certificatesRoutes = require("./routes/CertificateRoutes");
const enrollmentRoutes = require("./routes/EnrollmentRoutes");
const eventRoutes = require("./routes/EventsRoutes");
const feedbackRoutes = require("./routes/FeedbackRoutes");
const messagesRoutes = require("./routes/MessagesRoutes");
const notificationRoutes = require("./routes/NotificationRoutes");
const searchlogsRoutes = require("./routes/SearchLogsRoutes");
const skillsRoutes = require("./routes/SkillsRoutes");
const reportRoutes = require("./routes/ReportRoutes");
const resourceRoutes = require("./routes/ResourceRoutes");
const overviewRoutes = require("./routes/OverviewRoutes");
const quizRoutes = require("./routes/QuizRoutes");
const progressRoutes = require("./routes/ProgressRoutes");
const postRoutes = require("./routes/PostRoutes");
const communityRoutes = require("./routes/CommunityRoutes");
const activityRoutes = require("./routes/ActivityRoutes");
const friendsRoutes = require("./routes/FriendsRoutes");
const adminOverviewRoutes = require("./routes/AdminDashboardOverviewRoutes");

const app = express();
const PORT = process.env.PORT || 8000; // ✅ Use dynamic port (important for Render)

app.use(express.json());
app.use(cors());

// Routes
app.use(userRoutes);
app.use(courseRoutes);
app.use(certificatesRoutes);
app.use(achievementRoutes);
app.use(analyticsRoutes);
app.use(adminlogRoutes);
app.use(blogsRoutes);
app.use(categoryRoutes);
app.use(enrollmentRoutes);
app.use(eventRoutes);
app.use(feedbackRoutes);
app.use(messagesRoutes);
app.use("/notifications", notificationRoutes);
app.use(searchlogsRoutes);
app.use(skillsRoutes);
app.use(reportRoutes);
app.use(resourceRoutes);
app.use(overviewRoutes);
app.use("/posts", postRoutes);
app.use("/progress", progressRoutes);
app.use(quizRoutes);
app.use("/communities", communityRoutes);
app.use("/activities", activityRoutes);
app.use("/friends", friendsRoutes);
app.use(adminOverviewRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
