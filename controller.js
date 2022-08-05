const Message = require("./models/Message");
const User = require("./models/User");

class messengerRouter {
  async login(req, res) {
    try {
      const { username } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) return res.json(candidate);

      const user = new User({ username });
      await user.save();
      return res.json({ user: user });
    } catch (err) {
      console.log(err);
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
  async sendMessage(req, res) {
    try {
      const newMessage = new Message({
        sender: req.body.sender,
        reciever: req.body.reciever,
        title: req.body.title,
        content: req.body.content,
      });
      await newMessage.save();
      return res.json({ message: "Message sent" });
    } catch (err) {
      console.log(err);
    }
  }
  async messages(req, res) {
    try {
      const reciever = req.params.reciever;
      const allMessages = await Message.find({});
      let messages = [];
      for (let i = 0; i < allMessages.length; i++) {
        if (allMessages[i].reciever === reciever) {
          messages.push(allMessages[i]);
        }
      }
      return res.status(200).json(messages);
    } catch (err) {
      console.log(err);
    }
    return res.json(messages);
  }
  async getUsernames(req, res) {
    try {
      const allUsers = await User.find({});
      let usernames = [];
      for (let i = 0; i < allUsers.length; i++) {
        usernames.push(allUsers[i].username);
      }
      return res.status(200).json(usernames);
    } catch (err) {
      console.log(err);
    }
    return res.json(messages);
  }
}

module.exports = new messengerRouter();
