const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    const found_account = await Account.findById(record.account);
    console.log("old account: " + found_account);
    const new_account = await Account.findById(req.body);
    console.log("new_account: " + req.body.account);

    if (found_account) {
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

      if (record.account !== req.body.account) {
        const new_account = await Account.findById(req.body.account);
        if (req.body.type === "expense") {
          found_account.balance =
            parseInt(found_account.balance) + parseInt(req.body.amount);
          new_account.balance =
            parseInt(new_account.balance) - parseInt(req.body.amount);
        } else {
          found_account.balance =
            parseInt(found_account.balance) - parseInt(req.body.amount);
          new_account.balance =
            parseInt(new_account.balance) + parseInt(req.body.amount);
        }
        await new_account.save();
      }

      await found_account.save();
    } else {
      if (record.account !== req.body.account) {
        if (req.body.type === "expense") {
          new_account.balance =
            parseInt(new_account.balance) - parseInt(req.body.amount);
        } else {
          new_account.balance =
            parseInt(new_account.balance) + parseInt(req.body.amount);
        }
        await new_account.save();
      }
    }

    record.type = req.body.type || record.type;
    record.account = req.body.account || record.account;
    record.account_name = new_account.name;
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
