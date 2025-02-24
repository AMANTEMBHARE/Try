require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const issueRoutes = require("./routes/issues"); // Import issue routes

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("✅ Connected to MongoDB"));
db.on("error", (err) => console.error("❌ MongoDB Connection Error:", err));

// Use Routes
app.use("/api/issues", issueRoutes);

app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
