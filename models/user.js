const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "basic",
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
