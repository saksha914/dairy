import axios from "axios";
import { useState, useEffect } from "react";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [newExpenses, setNewExpenses] = useState({
    description: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getExpenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/createExpense`, newExpenses, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses([...expenses, newExpenses]);
      setNewExpenses({
        description: "",
        amount: "",
        expenseDate: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewExpenses({ ...newExpenses, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-green-50 min-h-screen p-8">
      <h2 className="text-3xl font-bold text-green-900 mb-6">Expenses</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h4 className="text-2xl font-semibold text-green-700 mb-4">Add an Expense</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="description"
            value={newExpenses.description}
            placeholder="Description"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            value={newExpenses.amount}
            placeholder="Amount"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            value={newExpenses.category}
            placeholder="Category"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="border-2 p-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition duration-300"
            type="submit"
          >
            Add Expense
          </button>
        </div>
      </form>

      <div>
        <h2 className="text-2xl font-semibold text-green-900 mb-4">Expenses List</h2>
        <ul className="grid md:grid-cols-3 gap-5">
          {expenses.map((expense) => (
            <li key={expense._id} className="rounded-lg bg-white shadow-md p-4 border-l-4 border-green-700">
              <p className="font-semibold text-green-800">Expense Description: {expense.description}</p>
              <p className="text-green-700">Amount: {expense.amount}</p>
              <p className="text-green-700">Date: {new Date(expense.expenseDate).toLocaleDateString()}</p>
              <p className="text-green-700">Category: {expense.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


