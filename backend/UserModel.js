const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },

  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: Date,
  country: String,
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
