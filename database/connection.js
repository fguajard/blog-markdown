const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const dataBase = mongoose.connection;

dataBase.on("error", (error) => console.log("Cant Connect to Database", error));

dataBase.once("open", () => console.log("Connected to Database"));

module.exports = mongoose;
