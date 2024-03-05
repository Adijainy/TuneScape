function connectSocket(io) {
  io.on("connection", (socket) => {
    console.log("user connected : ", socket.id);
    socket.on("disconnect", (reason, details) => {
      console.log(reason);
    });

    socket.on("playSong", (song) => {
      io.emit("sendSong", song);
    });

    socket.on("songPlay", (data) => {
      console.log("Playing song : " + data);
      io.emit("startPlay", data);
    });

    socket.on("songPause", (data) => {
      console.log("Pausing song : " + data);
      io.emit("pauseSong", data);
    });
  });
}

module.exports = connectSocket;
