const Record = require("../models/recordModels");

const getRecord = async (req, res) => {
  const records = await Record.find({}).sort({ date: -1 });
  res.status(200).json(records);
};

const addRecord = async (req, res) => {
  const { type, account, amount, category, date, payee, note } = req.body;
  try {
    const record = await Record.add(
      type,
      account,
      amount,
      category,
      date,
      payee,
      note
    );
    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

module.exports = { getRecord, addRecord };
