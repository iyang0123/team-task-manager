const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const express = require("express");

const app = express();
app.use(
  cors({
    origin: "https://team-task-manager-mu-roan.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.get("/hello", (req, res) => {
  res.send("Hello route working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});