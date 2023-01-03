const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  type: { type: String, required: true },
  account: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  payee: { type: String },
  note: { type: String },
  user_id: { type: String, required: true },
});

recordSchema.statics.add = async function (
  type,
  account,
  amount,
  category,
  date,
  payee,
  note
) {
  if (!type || !account || !amount || !category || !date) {
    throw Error("All fields must be filled");
  }
  const user_id = req.user._id;
  const record = await this.create({
    type,
    account,
    amount,
    category,
    date,
    payee,
    note,
    user_id,
  });
  return record;
};

module.exports = mongoose.model("Record", recordSchema);
