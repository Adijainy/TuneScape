const express = require("express");
const router = express.Router();

//import controllers
const {
  createLobby,
  joinLobby,
  getPublicLobbies,
  getLobbyMembers,
  getLobbyInfo,
} = require("../controllers/lobby");
const {
  createUser,
  leaveLobbyMember,
  leaveLobbyLeader,
} = require("../controllers/users");

const {
  getSong,
  addSong,
  addSongInLobby,
  removeFromQueue,
} = require("../controllers/song");

//routes
router.post("/user", createUser);
router.post("/lobby/create", createLobby);
router.post("/lobby/join", joinLobby);
router.put("/lobby/leave/member", leaveLobbyMember);
router.delete("/lobby/leave/leader", leaveLobbyLeader);
router.get("/lobby/public", getPublicLobbies);
router.get("/lobby/members", getLobbyMembers);
router.get("/lobby/get=:lobbyCode", getLobbyInfo);
router.get("/song/get=:songId", getSong);
router.post("/song/add", addSong);
router.put("/song/add/:lobbyCode&:songId", addSongInLobby);
router.delete("/song/remove/:lobbyCode&:songId", removeFromQueue);

module.exports = router;
