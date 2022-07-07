const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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

module.exports = mongoose.model("user", UserSchema);
