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
    const found_account = await Account.findById(account);
    if (record.type === "expense") {
      found_account.balance =
        parseInt(found_account.balance) - parseInt(amount);
    } else {
      found_account.balance =
        parseInt(found_account.balance) + parseInt(amount);
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
    const found_account = await Account.findById(record.account);
    console.log("balance b4:" + found_account.balance);
    if (record.type === "expense") {
      found_account.balance =
        Number(found_account.balance) + Number(record.amount);
    } else {
      found_account.balance =
        Number(found_account.balance) - Number(record.amount);
    }
    await found_account.save();
    console.log("balance a4:" + found_account.balance);

    await record.remove();
    res.json({ message: "Record Deleted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    const found_account = await Account.findById(record.account);
    console.log("balance b4:" + found_account.balance);

    // update the balance b4 updating lol
    if (record.type != req.body.type) {
      if (req.body.type === "income") {
        found_account.balance =
          parseInt(found_account.balance) + 2 * parseInt(record.amount);
      } else {
        found_account.balance =
          parseInt(found_account.balance) - 2 * parseInt(record.amount);
      }
    }
    if (record.amount > req.body.amount) {
      if (req.body.type === "expense") {
        found_account.balance =
          parseInt(found_account.balance) + (record.amount - req.body.amount);
      } else {
        found_account.balance =
          parseInt(found_account.balance) - (record.amount - req.body.amount);
      }
    } else if (record.amount < req.body.amount) {
      if (req.body.type === "expense") {
        found_account.balance =
          parseInt(found_account.balance) - (record.amount - req.body.amount);
      } else {
        found_account.balance =
          parseInt(found_account.balance) + (record.amount - req.body.amount);
      }
    }
    await found_account.save();

    console.log("balance a4:" + found_account.balance);

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
