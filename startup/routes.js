const express = require("express");
const members = require("../routes/members");
const auth = require("../routes/auth");
const places = require("../routes/places");
const records = require("../routes/records");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/members", members);
  app.use("/api/auth", auth);
  app.use("/api/places", places);
  app.use("/api/records", records);
};
