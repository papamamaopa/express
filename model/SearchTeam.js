const mongoose = require("mongoose");
const uidGen = require("uid-generator");

const searchServerSchema = new mongoose.Schema({
  name: {
    type: String,
    max: 15,
    required: true
  },
  for: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SearchTeam", searchServerSchema);
