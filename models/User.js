const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true, unique: true },
  lastLogin: { type: Date, required: true, default: Date.now },
}, {
  timestamps: true
});

module.exports = model("user", User);
