const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 30
  },
  email: {
    type: String,
    required: true,
    max: 20
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isModerator: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  profileImg: {
    type: String
  },
  posts: {
    type: Object
  },
  acceptedRules: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", userSchema);
