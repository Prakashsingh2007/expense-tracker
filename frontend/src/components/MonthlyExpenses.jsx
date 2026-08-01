import { EmptyState } from "./ui/StateDisplay";
import { formatCurrency } from "../utils/formatters";

function MonthlyExpenses({ data }) {
  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No monthly expenses"
        description="Monthly expense trends will appear here once transactions are added."
      />
    );
  }

  return (
    <div className="app-card p-6">
      <h2 className="text-xl font-semibold text-slate-950 mb-4">Monthly Expenses</h2>

      {data.map((month) => (
        <div key={month.month} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-b-0">
          <span className="text-sm font-medium text-slate-600">{month.month}</span>

          <span className="text-sm font-semibold text-slate-950">{formatCurrency(month.expense)}</span>
        </div>
      ))}
    </div>
  );
}

export default MonthlyExpenses;
