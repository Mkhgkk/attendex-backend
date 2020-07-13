const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const memberSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: Number,
    unique: true,
  },
  avatar: String,
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  department: {
    type: String,
    enum: ["Android Development", "IOS Developemt", "Human Resource"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

memberSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Member = mongoose.model("Member", memberSchema);

function validateMember(member) {
  const schema = {
    name: Joi.string().required(),
    phone: Joi.number().required(),
    avatar: Joi.string(),
    password: Joi.string().min(5).max(255),
    department: Joi.string(),
    isAdmin: Joi.boolean(),
  };

  return Joi.validate(member, schema);
}

exports.Member = Member;
exports.validate = validateMember;
