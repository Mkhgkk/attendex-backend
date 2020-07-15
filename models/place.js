const mongoose = require("mongoose");
const Joi = require("joi");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  address: String,
  location: {
    type: [Number],
  },
});

const Place = mongoose.model("Place", placeSchema);

function validatePlace(place) {
  const schema = {
    name: Joi.string().required(),
    logo: Joi.string(),
    address: Joi.string(),
    location: Joi.array().items(Joi.number()),
  };

  return Joi.validate(place, schema);
}

exports.Place = Place;
exports.validate = validatePlace;
