const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = require("./user");

const ProfileSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true, default: "male" },
  birthDate: { type: Date, required: true },
  city: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Profile", ProfileSchema);
