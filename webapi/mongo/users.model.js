// ket noi collection users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  photoURL: String,
  pass: { type: String, require: true },
  // phone: { type: Number, require: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});
module.exports = mongoose.models.users || mongoose.model("users", userSchema);
