require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const contactRoutes = require("./routes/contactRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const memoryRoutes = require("./routes/memoryRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", contactRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", memoryRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

module.exports = app;
