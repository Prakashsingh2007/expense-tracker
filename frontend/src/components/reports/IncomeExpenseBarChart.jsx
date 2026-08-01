import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { EmptyState } from "../ui/StateDisplay";
import { formatCurrency } from "../../utils/formatters";

function IncomeExpenseBarChart({ report }) {
    if (!report) {
        return (
            <EmptyState
                title="No report data"
                description="Chart data will show here once the report API returns values."
            />
        );
    }

    const income = Number(report.total_income) || 0;
    const expense = Number(report.total_expense) || 0;

    if (income === 0 && expense === 0) {
        return (
            <EmptyState
                title="No income or expense"
                description="Add transactions to compare income against spending."
            />
        );
    }

    const data = [
        {
            name: "Overview",
            Income: income,
            Expense: expense,
        },
    ];

    return (
        <div className="app-card p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-950">Income vs Expense</h2>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="Income" fill="#10b981" radius={[10, 10, 0, 0]} />
                        <Bar dataKey="Expense" fill="#f43f5e" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default IncomeExpenseBarChart;
