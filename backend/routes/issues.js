const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// GET all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ date: -1 });
    res.json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET issues filtered by type
router.get('/filter', async (req, res) => {
  const { type } = req.query;
  try {
    const issues = await Issue.find({ type }).sort({ date: -1 });
    res.json(issues);
  } catch (error) {
    console.error("Error filtering issues:", error);
    res.status(500).json({ message: error.message });
  }
});

// POST new issue with imageUrl support
router.post('/', async (req, res) => {
  try {
    console.log('Received issue data:', req.body);

    const { type, description, location, imageUrl } = req.body;

    // Ensure required fields exist
    if (!type || !description || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create issue object
    const issue = new Issue({
      type,
      description,
      location,
      imageUrl: imageUrl || '', // Default to empty string if not provided
    });

    console.log('Created issue object:', issue);

    // Save to database
    const newIssue = await issue.save();
    console.log('Saved issue:', newIssue);

    res.status(201).json(newIssue);
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
