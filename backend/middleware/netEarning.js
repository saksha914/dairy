const Sale = require("../Models/salesSchema");
const Expense = require("../Models/expensesSchema");

exports.netEarning = async (req, res) => {
  try {
    // console.log(req.user._id);
    const sales = await Sale.find({ farmer: req.user._id });
    const expenses = await Expense.find({ farmer: req.user._id });

    const totalEarnings = sales.reduce(
      (total, sale) => total + sale.totalPrice,
      0
    );
    const totalExpenses = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    const netIncome = totalEarnings - totalExpenses;

    res.status(200).json({
      totalEarnings,
      totalExpenses,
      netIncome,
      sales,
      expenses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
