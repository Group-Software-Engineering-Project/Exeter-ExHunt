// models/user.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String, 
  role: String, 
  email_address: String, 
  personal_tutor: String, 
  challenge_level: Number, 
  track_hunter_ranking: Number, 
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;