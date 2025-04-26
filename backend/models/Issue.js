const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  imageUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },

  // ✅ Track which user created the issue
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Issue = mongoose.model("Issue", IssueSchema);

module.exports = Issue;
