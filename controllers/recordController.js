const Record = require("../models/recordModels");

const getRecord = async (req, res) => {
  const records = await Record.find({}).sort({ date: -1 });
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
  const record = await Record.findById(req.params.id);
  if (record) {
    try {
      await record.remove();
      res.json({ message: "Note Removed" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    res.status(404).json({ error: req._id });
  }
};

module.exports = { getRecord, addRecord, deleteRecord };
