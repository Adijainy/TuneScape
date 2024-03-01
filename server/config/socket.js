
 function connectSocket(io){
    io.on("connection", (socket) => {
        console.log("user connected : ", socket.id);
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        socket.on("addSongToQueue", (data) => {
            console.log("song added to queue", data);

            socket.broadcast.emit("receiveSong", data);
            
            
        });
        socket.on('songPlay', (data) => {
            console.log('song is playing', data);
            io.emit('playSong', data);
        });
    });
}

module.exports = connectSocket;
