const Song = require("../models/songModel");
const Lobby = require("../models/lobbyModel");

exports.getSong = async (req, res) => {
  try {
    const { songId } = req.params;
    const { lobbyCode } = req.body;
    if (!songId) {
      return res.status(201).json({ message: "Song ID is required" });
    }
    if (!lobbyCode) {
      return res.status(201).json({
        success: false,
        message: "Lobby code is required",
      });
    }
    const song = await Song.findOne({ songId: songId });
    if (!song) {
      return res
        .status(202)
        .json({ message: "Song not found", success: false });
    }
    const lobby = await Lobby.findOne({ code: lobbyCode });
    const updateLobby = await Lobby.findByIdAndUpdate(
      lobby._id,
      { $push: { queue: newSong._id } },
      { new: true }
    )
      .populate("queue")
      .populate("members")
      .exec();
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
    console.log("req.body", req.body);
    const {
      songName,
      artist,
      album,
      songCover,
      songUrl,
      songId,
      songURI,
      duration,
      lobbyCode,
    } = req.body;

    console.log(album);
    if (
      !songName ||
      !artist ||
      !album ||
      !songCover ||
      !songUrl ||
      !songId ||
      !songURI ||
      !duration ||
      !lobbyCode
    ) {
      return res
        .status(400)
        .json({ sucess: false, message: "All fields are required" });
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
    const lobby = await Lobby.findOne({ code: lobbyCode });
    const updateLobby = await Lobby.findByIdAndUpdate(
      lobby._id,
      { $push: { queue: newSong._id } },
      { new: true }
    )
      .populate("queue")
      .populate("members")
      .exec();
    return res.status(201).json({
      success: true,
      message:
        "Song added successfully in db and added in lobby queue successfully",
      data: { newSong, updateLobby },
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
