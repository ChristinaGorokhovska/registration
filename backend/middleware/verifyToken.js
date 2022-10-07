const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/auth.config");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ error: err });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: err });
    req.user = decoded.email; // Improve
    next();
  });
};

module.exports = verifyToken;
