const Record = require("../models/recordModels");
const Account = require("../models/accountModels");

const getRecord = async (req, res) => {
  const user_id = req.user._id;

  const records = await Record.find({ user_id }).sort({ date: -1 });
  res.status(200).json(records);
};

const addRecord = async (req, res) => {
  const { type, account, amount, category, date, payee, note } = req.body;
  const user_id = req.user._id;
  try {
    const record = await Record.add(
      type,
      account,
      amount,
      category,
      date,
      payee,
      note,
      user_id
    );
    const found_account = await Account.findById(req.params.account);
    if (type === "expense") {
      found_account.balance -= amount;
    } else {
      found_account.balance += amount;
    }
    await found_account.save();

    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};
const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      throw Error("Record does not exist");
    }
    await record.remove();
    res.json({ message: "Note Removed" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    record.type = req.body.type || record.type;
    record.account = req.body.account || record.account;
    record.amount = req.body.amount || record.amount;
    record.category = req.body.category || record.category;
    record.date = req.body.date || record.date;
    record.payee = req.body.payee || record.payee;
    record.note = req.body.note || record.note;

    const updated_record = await record.save();
    res.status(200).json(updated_record);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getRecord, addRecord, deleteRecord, updateRecord };
