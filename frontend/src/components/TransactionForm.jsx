import { useState, useEffect } from "react";
import { createTransaction } from "../api/transactions";
import { getCategories } from "../api/categories";
import { normalizeListResponse } from "../utils/formatters";

function TransactionForm({ refreshTransactions }) {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    note: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        setCategories(normalizeListResponse(data));
      } catch {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.amount || !formData.category) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      await createTransaction({
        ...formData,
        category: Number(formData.category),
      });

      await refreshTransactions(); // Refresh the transaction list after adding a new one

      setFormData({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        note: "",
      });
    } catch {
      setError("Failed to create transaction.");
    }
  };

  return (
    <div className="app-card mb-6 p-6">
      <h2 className="text-2xl font-semibold text-slate-950 mb-4">Add Transaction</h2>

      {error && <p className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="app-input"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="app-input"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="app-input"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="app-input"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <textarea
          name="note"
          placeholder="Note"
          rows="3"
          value={formData.note}
          onChange={handleChange}
          className="app-input"
        />

        <button
          type="submit"
          className="app-button-primary w-full"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
