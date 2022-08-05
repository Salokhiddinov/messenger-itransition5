const { Schema, model } = require("mongoose");

const Message = new Schema({
  sender: { type: String, required: true },
  reciever: { type: String, required: true },
  title: { type: String, default: "Message" },
  content: { type: String, required: true }
});

module.exports = model("message", Message);
