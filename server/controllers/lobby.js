const User = require("../models/userModel");
const Lobby = require("../models/lobbyModel");

exports.createLobby = async (req, res) => {
  try {
    const { name, code, isPrivate, leader } = req.body;
    const Leader = await User.findById(leader);
    const lobby = await Lobby.create({
      name,
      code,
      isPrivate,
    });
    const updateLobby = await Lobby.findByIdAndUpdate(
      lobby._id,
      { leader: Leader._id, $push: { members: Leader._id } },
      { new: true }
    )
      .populate("leader")
      .exec();
    const updateUser = await User.findByIdAndUpdate(
      leader,
      { lobby: lobby._id },
      { new: true }
    )
      .populate("lobby")
      .exec();
    res.status(201).json({ updateLobby, updateUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.joinLobby = async (req, res) => {
  try {
    const { userId, lobbyCode } = req.body;
    const Member = await User.findById(userId);
    const lobby = await Lobby.findOne({ code: lobbyCode });
    if (!lobby) {
      res.status(404).json({ message: "Lobby not found" });
    }
    const updateLobby = await Lobby.findByIdAndUpdate(
      lobby._id,
      { $push: { members: Member._id } },
      { new: true }
    )
      .populate("members")
      .exec();
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { lobby: lobby._id },
      { new: true }
    )
      .populate("lobby")
      .exec();
    res.status(201).json({ updateLobby, updateUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPublicLobbies = async (req, res) => {
  try {
    const lobbies = await Lobby.find({ isPrivate: false }).populate("members");
    res.status(200).json(lobbies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLobbyMembers = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { lobbyCode } = req.body;
    if (!lobbyCode)
      return res.status(400).json({ message: "Lobby code is required" });
    const lobby = await Lobby.findOne({ code: lobbyCode })
      .populate("members")
      .exec();
    const lobbyMembers = lobby.members;
    res.status(200).json({ data: lobby });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
