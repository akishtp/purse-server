const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  type: { type: String, required: true },
  account: { type: String, required: true },
  account_name: { type: String, required: true },
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
  account_name,
  amount,
  category,
  date,
  payee,
  note,
  user_id
) {
  if (!type) {
    throw Error("Enter an expense type");
  } else if (!account || !account_name) {
    throw Error("Enter an account ");
  } else if (!amount) {
    throw Error("Enter an amount");
  } else if (!category) {
    throw Error("Enter a Category");
  } else if (!date) {
    throw Error("Enter Date and Time");
  }
  const record = await this.create({
    type,
    account,
    account_name,
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
