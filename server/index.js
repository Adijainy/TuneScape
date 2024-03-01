const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: "*",
}))
const tunesRoutes = require("./routers/tunes");
app.use("/api/v1", tunesRoutes);

//lets try
const connectSocket = require("./config/socket");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

connectSocket(io);

server.listen(process.env.PORT || 4000, ()=> {
  console.log(`Server is running on port ${PORT}`);
})

//start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

//connect to db
const dbConnect = require("./config/database");
dbConnect();

//defualt route
app.get("/", (req, res) => {
  res.send(`<h3>Welcome to tunescape backend</h3>`);
});
