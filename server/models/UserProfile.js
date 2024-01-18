const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    required: true,
  },
  profileUniqueId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
