const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 4005;
// setup express app
const app = express();

// Loading the DB
mongoose.connect(
  "mongodb://localhost:27017/consensys_app",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: cannot connect to my DB"));
db.once("open", function() {
  console.log("connected to the DB :) ");
});

// set up access control header
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Reuested-With, Content-Type, Accept");
  next();
});

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use("/api", require("./server/routes/api"));

// error handling middleware
app.use(function(err, req, res, next) {
  console.log(err); // to see properties of message in our console
  res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(PORT, function() {
  console.log("listening on port " + PORT);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});

app.on("uncaughtException", function(req, res, route, err) {
  if (!res.headersSent) {
    return res.send(500, { ok: false });
  }
});
