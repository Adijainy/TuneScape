const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  lobby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lobby",
  },
  leader:{
    type: Boolean,
    required: true,
  
  }
});

module.exports = mongoose.model("User", userSchema);
