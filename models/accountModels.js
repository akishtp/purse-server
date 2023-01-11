const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  color: { type: String, default: "#2461de", required: true },
  user_id: { type: String, required: true },
});

module.exports = mongoose.model("Account", accountSchema);
