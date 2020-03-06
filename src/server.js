const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const server = express();

const dbRoute =
  "mongodb+srv://drew:TinDev@cluster0-ztfes.mongodb.net/tindev?retryWrites=true&w=majority";

mongoose.connect(
  dbRoute,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  (err, res) => {
    if (err) throw console.log(err);
  }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

server.use(express.json);
server.use(routes);
server.listen(5000);
