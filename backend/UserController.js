const User = require("./UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("./config/auth.config");

// Sign up
exports.signUp = function (req, res) {
  console.log("req.body", req.body);
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      createdAt: Date.now(),
      country: req.body.country,
      refreshToken: "",
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

// Sign in
exports.signIn = function (req, res) {
  User.findOne({ email: req.body.email }).exec((err, data) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }

    if (!data) {
      res.status(401).json({ message: "Incorrect password or email" });
      return;
    }

    const correctPassword = bcrypt.compareSync(req.body.password, data.password);

    if (!correctPassword) {
      res.status(401).json({ message: "Incorrect password or email" });
      return;
    }

    const accessToken = jwt.sign(
      {
        email: data.email,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );

    const refreshToken = jwt.sign({ email: data.email }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

    User.updateOne({ email: data.email }, { refreshToken: refreshToken });

    res.cookie("jwt_token", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "User ia authentificated", accessToken: accessToken });
  });
};
