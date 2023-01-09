const Record = require("../models/recordModels");
const { update } = require("../models/userModels");

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
    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};
const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    await record.remove();
    res.json({ message: "Note Removed" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getRecord, addRecord, deleteRecord };
