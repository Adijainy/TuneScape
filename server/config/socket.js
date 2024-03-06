function connectSocket(io) {
  io.on("connection", (socket) => {
    console.log("user connected : ", socket.id);
    socket.on("disconnect", (reason, details) => {
      console.log(reason);
    });

    socket.on("joinRoom", (lobbyCode) => {
      socket.join(lobbyCode);
      console.log("Joined room : ", lobbyCode);
    });

    socket.on("playSong", (song, lobbyCode) => {
      io.to(lobbyCode).emit("sendSong", song);
    });

    socket.on("songPlay", (data) => {
      console.log("Playing song : " + data);
      io.emit("startPlay", data);
    });

    socket.on("songPause", (data) => {
      console.log("Pausing song : " + data);
      io.emit("pauseSong", data);
    });
    socket.on("leaveRoom", (lobbyCode, userLeft) => {
      io.to(lobbyCode).emit("userLeft", userLeft);
    });
  });
}

module.exports = connectSocket;
