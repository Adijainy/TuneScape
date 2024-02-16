const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const tunesRoutes = require("./routers/tunes");
app.use("/api/v1", tunesRoutes);

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//connect to db
const dbConnect = require("./config/database");
dbConnect();

//defualt route
app.get("/", (req, res) => {
  res.send(`<h3>Welcome to tunescape backend</h3>`);
});
