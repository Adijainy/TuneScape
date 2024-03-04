const mongoose = require("mongoose");

//require("dotenv").config() will load all the variables from .env file into process.env
require("dotenv").config();

//function to connect nodejs app to database
const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((error) => {
      console.log("Issue in db connection: " + error.message);
      //exit the process if db connection not established
      process.exit(1);
    });
};
module.exports = dbConnect;
