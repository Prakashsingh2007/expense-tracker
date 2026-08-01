import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { EmptyState } from "../ui/StateDisplay";
import { formatCurrency } from "../../utils/formatters";

function MonthlyTrendChart({ data, title = "Expense Trend" }) {
    if (!data || data.length === 0) {
        return (
            <EmptyState
                title="No expense trend yet"
                description="Spending movement will appear here once there are enough transactions."
            />
        );
    }

    return (
        <div className="app-card p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-950">{title}</h2>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#0f172a"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            connectNulls
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default MonthlyTrendChart;
