const session = require("express-session");
const express = require("express");
const app = express();

app.use(session({
  secret: "shhhhh",
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

function addOne(req, res, next) {
  req.session.count = (req.session.count || 0) + 1;
  next('route');
}

function timesTwo(req, res, next) {
  req.session.count = req.session.count * 2;
  next('route');
}

function squared(req, res, next) {
  req.session.count = Math.pow(req.session.count, 2);
  next();
}

app.get("/", addOne, function(req, res) {
  res.send(`${req.session.count}`)
});

app.get("/", timesTwo, function(req, res) {
  res.send(`${req.session.count}`)
});

app.get("/", squared, function(req, res) {
  res.send(`${req.session.count}`)
});


app.listen(3000, function() {
    console.log("Glistening server is now listening...");
});
