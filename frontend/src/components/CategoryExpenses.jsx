import { EmptyState } from "./ui/StateDisplay";
import { formatCurrency } from "../utils/formatters";

function CategoryExpenses({ data }) {
  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No category data"
        description="Category spending will appear here once transactions are categorized."
      />
    );
  }

  return (
    <div className="app-card p-6">
      <h2 className="text-xl font-semibold text-slate-950 mb-4">Category Expenses</h2>

      {data.map((category) => (
        <div key={category.category} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-b-0">
          <span className="text-sm font-medium text-slate-600">{category.category}</span>

          <span className="text-sm font-semibold text-slate-950">{formatCurrency(category.amount)}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryExpenses;
