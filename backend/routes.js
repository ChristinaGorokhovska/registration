const routes = require("express").Router();
const UserController = require("./UserController");

routes.get("/", (req, res) => {
  res.send("Test endpoint");
});

// Sign up
routes.route("/signup").post(UserController.signUp);

// Sign in
routes.route("/signin").post(UserController.signIn);

// Authentificate
routes.route("/user").get(UserController.authentificatedUser);

// Refresh
routes.route("/refresh").post(UserController.refreshToken);

module.exports = routes;
