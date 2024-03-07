const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  songCover: {
    type: String,
    required: true,
  },
  songUrl: {
    type: String,
    required: true,
  },
  songId: {
    type: String,
    required: true,
  },
  songURI: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Song", songSchema);
