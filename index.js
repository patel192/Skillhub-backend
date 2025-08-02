const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors())
const userRoutes = require("./routes/UserRoutes");

app.use(userRoutes);

const PORT = 5000

mongoose
  .connect("mongodb://localhost:27017/skillhub")
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log("server running on the port number 5000");
    });
  })
  .catch(() => {
    console.log("connection failed");
  });