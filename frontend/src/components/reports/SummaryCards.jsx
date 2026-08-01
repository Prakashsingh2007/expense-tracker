import { formatCurrency } from "../../utils/formatters";

function SummaryCards({ report }) {
    if (!report) return null;

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="app-card bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 text-white">
                <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-50/80">Total Income</h3>
                <h2 className="mt-2 text-3xl font-semibold">{formatCurrency(report.total_income)}</h2>
            </div>

            <div className="app-card bg-gradient-to-br from-rose-500 to-rose-600 p-5 text-white">
                <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-rose-50/80">Total Expense</h3>
                <h2 className="mt-2 text-3xl font-semibold">{formatCurrency(report.total_expense)}</h2>
            </div>

            <div className="app-card bg-gradient-to-br from-sky-500 to-cyan-600 p-5 text-white">
                <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-sky-50/80">Balance</h3>
                <h2 className="mt-2 text-3xl font-semibold">{formatCurrency(report.balance)}</h2>
            </div>
        </div>
    );
}

export default SummaryCards;
