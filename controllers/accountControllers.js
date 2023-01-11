const Account = require("../models/accountModels");

const getAccounts = async (req, res) => {
  const user_id = req.user._id;
  const accounts = await Account.find({ user_id }).sort({ date: -1 });
  res.status(200).json(accounts);
};

const addAccount = async (req, res) => {
  const { name, balance, color } = req.body;
  const user_id = req.user._id;
  try {
    const account = await Account.create({ name, balance, color, user_id });
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      throw Error("Account does not exist");
    }
    await account.remove();
    res.json({ message: "Account Deleted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    account.name = req.body.name || account.name;
    account.balance = req.body.balance || account.balance;
    account.color = req.body.color || account.color;
    const updated_account = await account.save();
    res.status(200).json(updated_account);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getAccounts, addAccount, deleteAccount, updateAccount };
