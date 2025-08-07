const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
