const { json } = require("body-parser");
const e = require("express");
const User = require("./UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = require("./config/auth.config");

// Sign up
exports.signUp = function (req, res) {
  User.findOne({ email: req.body.email }).exec((err, data) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }

    if (data) {
      res.status(400).json({ message: `Such user with email ${data.email} exists` });
      return;
    }
    const user = new User({
      name: {
        firstName: req.body.name.firstName,
        lastName: req.body.name.lastName,
      },
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      createdAt: Date.now(),
      country: req.body.country,
    });

    user.save((err, data) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }

      res.status(200).json({ message: "User is registered!", data: data });
    });
  });
};

exports.signIn = function (req, res) {
  User.findOne({ email: req.body.email }).exec((err, data) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }

    console.log(data.password);

    const correctPassword = bcrypt.compareSync(req.body.password, data.password);

    if (!correctPassword) {
      res.status(401).json({ message: "Incorrect password or email" });
      return;
    }

    const token = jwt.sign({ id: data.id }, SECRET, { expiresIn: 86400 });

    res.status(200).json({ message: "User ia authentificated", token: token, email: data.email });
  });
};
