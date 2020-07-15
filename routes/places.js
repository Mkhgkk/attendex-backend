const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Place, validate } = require("../models/place");

router.get("/", async (req, res) => {
  const place = await Place.findOne().select("-__v");

  res.send(place);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let place = new Place(
    _.pick(req.body, ["name", "address", "location", "logo"])
  );

  place = await place.save();

  res.send(place);
});

module.exports = router;
