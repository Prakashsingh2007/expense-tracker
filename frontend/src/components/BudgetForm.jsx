import { useState, useEffect } from "react";
import { createBudget } from "../api/budgets";
import { getCategories } from "../api/categories";
import { normalizeListResponse } from "../utils/formatters";

const BudgetForm = ({ onCreate }) => {
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [month, setMonth] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !limit || !month) return;

    try {
      const budget = await createBudget({
        category: Number(category),
        limit: parseFloat(limit),
        month,
      });

      onCreate(budget);

      setCategory("");
      setLimit("");
      setMonth("");
    } catch {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="app-card p-6">
      <h2 className="text-2xl font-semibold text-slate-950 mb-6">Create Budget</h2>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="app-input"
          required
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Limit */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Budget Limit</label>

        <input
          type="number"
          step="0.01"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="app-input"
          placeholder="Enter Budget Limit"
          required
        />
      </div>

      {/* Month */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Month</label>

        <input
          type="date"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="app-input"
          required
        />
      </div>

      <button
        type="submit"
        className="app-button-primary"
      >
        Create Budget
      </button>
    </form>
  );
};

export default BudgetForm;
