const mongoose = require("mongoose");
const Joi = require("joi");

const recordSchema = new mongoose.Schema({
  date: Date,
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
});

const Record = mongoose.model("Record", recordSchema);

function validateRecord(record) {
  const schema = {
    date: Joi.date(),
    member: Joi.objectId(),
  };

  return Joi.validate(record, schema);
}

exports.Record = Record;
exports.validate = validateRecord;
