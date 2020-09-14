const express = require("express");
const app = express();
require("./utils/connectDb");
const cors = require("cors");
const bodyParser = require("body-parser");
const signupRoute = require("./routes/user/signup");
const loginRoute = require("./routes/user/signin");
// const adminRoute = require("./routes/admin.router");
const dotenv = require("dotenv");
const config = require("./config");

dotenv.config();
const port = process.env.PORT || 8000;

// admin panel
// app.use("/admin", adminRoute);
// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.send("home");
});
app.use("/api/signin", loginRoute);
app.use("/api/signup", signupRoute);
app.listen(port, () => console.log("Listening on port " + port));
