import { useState, useEffect } from "react";
import { updateBudget } from "../api/budgets";
import { getCategories } from "../api/categories";
import { normalizeListResponse, formatCurrency } from "../utils/formatters";

const BudgetCard = ({ budget, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState(budget.category);
  const [limit, setLimit] = useState(budget.limit);
  const [month, setMonth] = useState(budget.month);
  const [categories, setCategories] = useState([]);

  const handleUpdate = async () => {
    if (!category || !limit || !month) return;

    try {
      const updatedBudget = await updateBudget(budget.id, {
        category: Number(category),
        limit: parseFloat(limit),
        month,
      });

      onUpdate(updatedBudget);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update budget:", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this budget?",
    );

    if (!confirmDelete) return;

    try {
      await onDelete(budget.id);
    } catch {
      console.error("Failed to delete budget:", err);
    }
  };
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

  return (
    <div className="app-card p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_60px_-35px_rgba(15,23,42,0.45)]">
      {isEditing ? (
        <>
          <div className="mb-3">
            <label className="block font-medium mb-1">Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="app-input"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Budget Limit</label>

            <input
              type="number"
              step="0.01"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="app-input"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Month</label>

            <input
              type="date"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="app-input"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="app-button-primary"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="app-button-secondary"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-slate-950">
            Category: {budget.category_name}
          </h3>

          <p className="mt-2 text-slate-500">Budget Limit: {formatCurrency(budget.limit)}</p>

          <p className="text-slate-500">Month: {budget.month}</p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setIsEditing(true)}
              className="app-button-secondary"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="app-button-danger"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetCard;
