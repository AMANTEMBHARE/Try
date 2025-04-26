const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");
const { authMiddleware, adminMiddleware } = require("./middlewares/auth");

router.get("/test", (req, res) => {
    res.send("API is working!");
  });

// 📝 Create an Issue (POST)
router.post("/issues", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newIssue = new Issue({ title, description, category });
    await newIssue.save();
    res.status(201).json({ message: "Issue created successfully!", issue: newIssue });
  } catch (error) {
    res.status(500).json({ error: "Failed to create issue" });
  }
});

// 📋 Get All Issues (GET)
router.get("/issues", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

// 🔍 Get an Issue by ID (GET)
router.get("/issues/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: "Error fetching issue" });
  }
});

// ✅ Update Issue Status (PUT)
router.put("/issues/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.json({ message: "Issue updated successfully", issue });
  } catch (error) {
    res.status(500).json({ error: "Failed to update issue" });
  }
});

// ❌ Delete an Issue (DELETE)
router.delete("/issues/:id", async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete issue" });
  }
});


// GET route for fetching all issues
app.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.find(); // Fetch all issues from MongoDB
    res.status(200).json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

// Example: Only admin can delete issues
router.delete("/issues/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting issue" });
  }
});

// 👇 Allow all users to create/view issues
router.post("/issues", authMiddleware, createIssue);
router.get("/issues", authMiddleware, getIssues);

// 👇 Only admins can update & delete issues
router.put("/issues/:id", authMiddleware, adminMiddleware, updateIssue);
router.delete("/issues/:id", authMiddleware, adminMiddleware, deleteIssue);



module.exports = router;
