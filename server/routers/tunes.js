const express = require("express");
const router = express.Router();

//import controllers
const { createLobby, joinLobby } = require("../controllers/lobby");
const { createUser } = require("../controllers/users");

//routes
router.post("/user", createUser);
router.post("/lobby/create", createLobby);
router.post("/lobby/join", joinLobby);

module.exports = router;
