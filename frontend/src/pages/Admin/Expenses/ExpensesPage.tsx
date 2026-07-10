import { useEffect, useState } from "react";
import "./ExpensesPage.css";

function ExpensesPage() {

  const [categories, setCategories] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);

  const [categoryId, setCategoryId] = useState("");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    loadCategories();
    loadExpenses();
  }, []);

  async function loadCategories() {

    const response = await fetch(
      "http://localhost:5000/expenses/categories"
    );

    const data = await response.json();

    setCategories(data);

  }

  async function loadExpenses() {

    const response = await fetch(
      "http://localhost:5000/expenses"
    );

    const data = await response.json();

    setExpenses(data);

  }

  async function saveExpense() {

    if (!categoryId) {

      alert("Please select category");

      return;

    }

    if (!vendor.trim()) {

      alert("Vendor is required");

      return;

    }

    if (!amount) {

      alert("Amount is required");

      return;

    }

    await fetch(
      "http://localhost:5000/expenses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          categoryId,

          vendor,

          amount,

          description,

          expenseDate,

        }),

      }
    );

    setCategoryId("");
    setVendor("");
    setAmount("");
    setDescription("");

    loadExpenses();

  }

  return (

    <div className="expenses-page">

      <h1>Expense Management</h1>

      <div className="expense-form">

        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(e.target.value)
          }
        >

          <option value="">
            Select Category
          </option>

          {categories.map((category) => (

            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>

          ))}

        </select>

        <input
          placeholder="Vendor"
          value={vendor}
          onChange={(e) =>
            setVendor(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <input
          type="date"
          value={expenseDate}
          onChange={(e) =>
            setExpenseDate(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          className="save-btn"
          onClick={saveExpense}
        >
          Save Expense
        </button>

      </div>

      <br />

      <table>

        <thead>

          <tr>

            <th>Category</th>

            <th>Vendor</th>

            <th>Amount</th>

            <th>Date</th>

            <th>Description</th>

          </tr>

        </thead>

        <tbody>

          {expenses.map((expense) => (

            <tr key={expense.id}>

              <td>{expense.category}</td>

              <td>{expense.vendor}</td>

              <td>

                ₹

                {Number(expense.amount).toLocaleString(
                  "en-IN"
                )}

              </td>

              <td>

                {new Date(
                  expense.expense_date
                ).toLocaleDateString("en-IN")}

              </td>

              <td>{expense.description}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ExpensesPage;
