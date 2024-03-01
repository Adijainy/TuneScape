
 function connectSocket(io){
    io.on("connection", (socket) => {
        console.log("user connected : ", socket.id);
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        
    });
}

module.exports = connectSocket;
