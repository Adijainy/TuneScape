const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const server = require("http").createServer(app);
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

//lets try
const connectSocket = require("./config/socket");
connectSocket(io);

//connect to db
const dbConnect = require("./config/database");
dbConnect();

//routes
const tunesRoutes = require("./routers/tunes");
app.use("/api/v1", tunesRoutes);

//defualt route
app.get("/", (req, res) => {
  res.send(`<h3>Welcome to tunescape backend</h3>`);
});
