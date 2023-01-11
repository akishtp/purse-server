const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  name: { type: String, required: true },
  money: { type: Number, required: true },
  color: { type: String, default: "#2461de", required: true },
});

module.exports = mongoose.model("Account", accountSchema);
