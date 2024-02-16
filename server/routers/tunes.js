const express = require("express");
const router = express.Router();

//import controllers
const {
  createLobby,
  joinLobby,
  getPublicLobbies,
  getLobbyMembers,
} = require("../controllers/lobby");
const {
  createUser,
  leaveLobbyMember,
  leaveLobbyLeader,
} = require("../controllers/users");

//routes
router.post("/user", createUser);
router.post("/lobby/create", createLobby);
router.post("/lobby/join", joinLobby);
router.put("/lobby/leave/member", leaveLobbyMember);
router.delete("/lobby/leave/leader", leaveLobbyLeader);
router.get("/lobby/public", getPublicLobbies);
router.get("/lobby/members", getLobbyMembers);

module.exports = router;
