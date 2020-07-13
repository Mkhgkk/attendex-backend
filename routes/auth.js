const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Member } = require("../models/member");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let member = await Member.findOne({ phone: req.body.phone });
    if (!member) return res.status(400).send("Invalid phone or password.");

    const validPassword = await bcrypt.compare(req.body.password, member.password);
    if (!validPassword) return res.status(400).send("Invalid phone or password.");

    const token = member.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        phone: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(req, schema);
}

module.exports = router;
