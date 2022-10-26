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
  const record = await this.create({
    type,
    account,
    amount,
    category,
    date,
    payee,
    note,
  });
  return record;
};

module.exports = mongoose.model("Record", recordSchema);
