const mongoose = require('mongoose');

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
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;
