const express = require("express");
const router = express.Router();
const { Record, validate } = require("../models/record");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const records = await Record.find({ member: req.user._id })
    .select("-__v")
    .sort("-date");

  res.send(records);
});

// router.get("/:memberId", async (req, res) => {
//   const records = await Record.findById({ member: req.params.memberId }).select(
//     "-__v"
//   );

//   res.send(records);
// });

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let record = new Record({
    member: req.user._id,
    date: new Date(),
  });

  record = await record.save();

  res.send(record);
});

module.exports = router;
