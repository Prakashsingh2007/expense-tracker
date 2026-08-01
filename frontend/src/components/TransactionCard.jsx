import { useState } from "react";
import { formatCurrency } from "../utils/formatters";

function TransactionCard({ transaction, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: transaction.title,
    amount: transaction.amount,
    type: transaction.type,
    note: transaction.note,
    category: transaction.category,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onUpdate(transaction.id, formData);

    setEditing(false);
  };
  const handleDelete = async () => {
    if (!window.confirm("Delete this transaction?")) return;

    await onDelete(transaction.id);
  };

  if (editing) {
    return (
      <div className="app-card p-5">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="app-input"
          />

          <input
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            className="app-input"
          />

          <div className="flex gap-3">
            <button type="submit" className="app-button-primary flex-1">
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditing(false)}
              className="app-button-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="app-card p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_60px_-35px_rgba(15,23,42,0.45)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">{transaction.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{transaction.note || "No note added."}</p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xl font-semibold text-slate-950">{formatCurrency(transaction.amount)}</p>
          <p className="text-sm capitalize text-slate-500">{transaction.type}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={() => setEditing(true)} className="app-button-secondary">
          Edit
        </button>

        <button onClick={handleDelete} className="app-button-danger">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionCard;
