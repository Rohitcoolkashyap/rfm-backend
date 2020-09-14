const mongoose = require("mongoose");
const config = require("../config");

var url = config.MONGODB_URL;

mongoose.connect(
  url,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, db) => {
    if (err) throw err;
    console.log("Database created!");
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongodb connection error"));
