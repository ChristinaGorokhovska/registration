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
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign({ email: data.email }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

    User.findOne({ email: data.email }, function (err, user) {
      if (err) return res.status(400).json({ error: err });

      if (user) {
        user.refreshToken = refreshToken;
        user.save((err) => {
          if (err) return res.status(400).json({ error: err });
        });
      }
    });

    res.cookie("token", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "User ia authentificated", accessToken: accessToken });
  });
};

// Authentificated user
exports.authentificatedUser = async function (req, res) {
  try {
    const accessToken = req.header("Authorization")?.split(" ")[1] || "";

    const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    if (!payload) return res.status(401).json({ message: "User is unauthentificated" });

    const user = await User.findOne({ email: payload.email });

    res.status(200).json({ message: "User is authentificated", firstName: user.name.firstName });
  } catch (e) {
    return res.status(401).json({ message: "User is unauthentificated" });
  }
};

exports.refreshToken = async function (req, res) {
  try {
    const refreshToken = req.cookies;

    const payload = jwt.verify(refreshToken.token, REFRESH_TOKEN_SECRET);

    if (!payload) return res.status(401).json({ message: "User is unauthentificated" });

    const dbRefreshToken = await User.findOne({ refreshToken: refreshToken.token });

    if (!dbRefreshToken) return res.status(401).json({ message: "User is unauthentificated" });

    const newAccessToken = jwt.sign({ email: payload.email }, ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
    res.status(200).json({ message: "Token have been refreshed", accessToken: newAccessToken });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "User is unauthentificated" });
  }
};
