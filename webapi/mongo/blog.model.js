// ket noi collection users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const blogSchema = new Schema({
  name: { type: String, require: true },
  image: { type: String, require: true },
  description: { type: String, require: true },
});
module.exports = mongoose.models.blogs || mongoose.model("blogs", blogSchema);
