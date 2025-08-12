const express = require("express");
const app = express();
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
const challengesRoutes = require("./routes/ChallengesRoutes");
const PORT = 8000;
app.use(express.json());
app.use(cors());
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
app.use(notificationRoutes);
app.use(searchlogsRoutes);
app.use(skillsRoutes);
app.use(reportRoutes);
app.use(resourceRoutes);
app.use(overviewRoutes);
app.use(challengesRoutes);

mongoose
  .connect("mongodb://localhost:27017/skillhub")
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log("server running on the port number 8000");
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
