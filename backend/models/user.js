const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "user" },
  password: { type: String, required: true, minlength: 6 },
  profiles: [{ type: mongoose.Types.ObjectId, required: true, ref: "Profile" }],
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
