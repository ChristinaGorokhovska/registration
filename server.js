const express = require("express");
const app = express();
const cors = require("cors");
const apiRoutes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { HOST, PORT_DB, DB } = require("./config/db.config");
const { SECRET } = require("./config/auth.config");
const { PORT } = require("./config/server.config");

mongoose
  .connect(`mongodb://${HOST}:${PORT_DB}/${DB}`, { useNewUrlParser: true })
  .catch((err) => console.log("error: ", err));

mongoose.connection.on("error", (err) => console.log("error: ", err));
mongoose.connection.on("connected", () => console.log("Connected to db"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(
  cookieSession({
    name: "session",
    secret: SECRET,
  })
);

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT} port`);
});

app.use("/api", apiRoutes);
