const ExpenseData = require("../Expense/Expense.model");
const Users = require("../Users/user.model");
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');  // Import ObjectId if you're using Node.js

const objectIdValue = "670103baa976d6c46853533e";
exports.GetAllExpense = async (req, res) => {
  try {
    const Expense = await ExpenseData.find({});
    // .populate("Userid");

    if (!Expense) {
      res.status(404).json({ status: "Data Not Found !!" });
    } else {
      res.status(200).json(Expense);
    }
  } catch (error) {
    console.log(error);
  }
};
exports.GetExpenseByUser = async (req, res) => {
  try {
    const query = req.query.UserID;
    const user = await Users.findOne({ _id: query });

    if (!user) {
      res.status(404).json({ status: "User Not Found !!" });
    } else {
      const Expense = await ExpenseData.find({
        Userid: { _id: query },
      }).populate("Userid");

      if (!Expense) {
        res.status(404).json({ status: "Data Not Found !!" });
      } else {
        res.status(200).json(Expense);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
exports.GetDashData = async (req, res) => {

  try {
    const query = req.query.UserID;
    const user = await Users.findOne({ _id: query });
    const Expense = await ExpenseData.find({
      Userid: { _id: query },
    }).populate("Userid");
   let data =  JSON.parse(JSON.stringify(Expense));

    console.log(data ,'data');
    console.log(ExpenseData);
    var Data = [];
    let DashListedItems = {
      TotalExpends: 0,
      TotalIncome: 0,
      TotalSavings: 0,
      MostSpends: 0,
    }; 

    if (!user) {
      res.status(404).json({ status: "User Not Found !!" });
    } else {
      // Total Expends and Income

      TotalExpends = await ExpenseData.aggregate([
        { $match: { Userid: new ObjectId(objectIdValue) } },
        {
          $group: {
            _id: "$Type",
            TotalAmount: { $sum: "$Amount" },
          },
        },
      ]);
      console.log(TotalExpends, 'TotalExpends');
      DashListedItems.TotalExpends =
        TotalExpends.length > 0 ? TotalExpends[2].TotalAmount : 0;
      DashListedItems.TotalIncome =
        TotalExpends.length > 1 ? TotalExpends[1].TotalAmount : 0;
        DashListedItems.TotalSavings =
        TotalExpends.length > 0 ? TotalExpends[0].TotalAmount : 0;
        console.log(DashListedItems)
      Data.push(DashListedItems);
      res.json({ Data });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.CreateExpense = async (req, res) => {
  try {
    let Expense = new ExpenseData(req.body);
    const Expenses = await Expense.save();
    if (!Expenses) {
      res.status(404).json({ message: "Something Went Wrong !!" });
    } else {
      res.status(200).json({ message: "Expense Added.." });
    }
  } catch (err) {
    console.log("error" + err);
  }
};
