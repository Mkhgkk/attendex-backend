const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Member, validate } = require("../models/member");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const member = await Member.findById(req.user._id).select("-password -__v");
  res.send(member);
});

router.get("/", async (req, res) => {
  const members = await Member.find().select("-password -__v");

  res.send(members);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let member = await Member.findOne({ phone: req.body.phone });
  if (member) return res.status(400).send("Member already registered");

  member = new Member(
    _.pick(req.body, ["name", "phone", "department", "password"])
  );

  const salt = await bcrypt.genSalt(10);
  member.password = await bcrypt.hash(member.password, salt);
  await member.save();

  const token = member.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-header", "x-auth-token")
    .send(_.pick(member, ["_id", "name", "phone"]));
});

module.exports = router;
