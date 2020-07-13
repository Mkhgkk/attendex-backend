const express = require("express");
const members = require("../routes/members");
const auth = require("../routes/auth");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/members", members);
    app.use("/api/auth", auth);
};