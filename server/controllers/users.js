const User = require("../models/userModel");
const Lobby = require("../models/lobbyModel");

exports.createUser = async (req, res) => {
  try {
    const { username, avatar, leader } = req.body;
    if(!username || !avatar){
      return res.status(400).json({ message: `All fields are required user : ${username}, avatar: ${avatar}, leader: ${leader}` });
    }
    const user = await User.create({ username, avatar, leader });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.leaveLobbyMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const lobby = await Lobby.findById(user.lobby);
    const updateLobby = await Lobby.findByIdAndUpdate(
      lobby._id,
      { $pull: { members: userId } },
      { new: true }
    )
      .populate("members")
      .exec();
    const deleteMember = await User.findByIdAndDelete(userId);
    res.status(201).json({ updateLobby });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.leaveLobbyLeader = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const lobby = await Lobby.findById(user.lobby);
    lobby.members.map(async (member) => {
      await User.findByIdAndDelete(member);
    });
    await Lobby.findByIdAndDelete(lobby._id);
    res.status(201).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
