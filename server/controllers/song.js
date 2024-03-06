const Song = require("../models/songModel");
const Lobby = require("../models/lobbyModel");

exports.getSong = async (req, res) => {
  try {
    const { songId } = req.params;
    if (!songId) {
      return res.status(201).json({ message: "Song ID is required" });
    }
    const song = await Song.findOne({ songId: songId });
    if (!song) {
      return res
        .status(202)
        .json({ message: "Song not found", success: false });
    }
    return res.status(200).json({
      sucess: true,
      message: "Song returned successfully",
      data: song,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addSong = async (req, res) => {
  try {
    const {
      songName,
      artist,
      album,
      songCover,
      songUrl,
      songId,
      songURI,
      duration,
    } = req.body;
    if (
      !songName ||
      !artist ||
      !album ||
      !songCover ||
      !songUrl ||
      !songId ||
      !songURI ||
      !duration
    ) {
      return res
        .status(400)
        .json({ sucess: false, message: "All fields are required user" });
    }
    const newSong = await Song.create({
      songName,
      artist,
      album,
      songCover,
      songUrl,
      songId,
      songURI,
      duration,
    });
    return res.status(201).json({
      success: true,
      message: "Song added successfully",
      data: newSong,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addSongInLobby = async (req, res) => {
  try {
    const { lobbyCode, songId } = req.params;
    if (!lobbyCode || !songId) {
      return res.status(400).json({
        success: false,
        message: "Lobby code and song ID is required",
      });
    }
    const lobby = await Lobby.findOne({ code: lobbyCode });
    const updateLobby = await Lobby.findByIdAndUpdate(
      lobby._id,
      { $push: { queue: songId } },
      { new: true }
    )
      .populate("queue")
      .populate("members")
      .exec();
    res.status(201).json({
      success: true,
      message: "Song added in lobby successfully",
      data: updateLobby,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.removeFromQueue = async (req, res) => {
  try {
    const { lobbyCode, songId } = req.params;
    if (!lobbyCode || !songId) {
      return res.status(400).json({
        success: false,
        message: "Lobby code and song ID is required",
      });
    }
    const lobby = await Lobby.findOne({ code: lobbyCode });
    const updateLobby = await Lobby.findByIdAndUpdate(
      lobby._id,
      { $pull: { queue: songId } },
      { new: true }
    )
      .populate("queue")
      .populate("members")
      .exec();
    res.status(201).json({
      success: true,
      message: "Song removed from lobby queue successfully",
      data: updateLobby,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
