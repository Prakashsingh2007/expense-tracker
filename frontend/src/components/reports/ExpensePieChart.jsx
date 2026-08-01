import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { EmptyState } from "../ui/StateDisplay";
import { formatCurrency } from "../../utils/formatters";

const COLORS = [
    "#0f766e",
    "#0369a1",
    "#b45309",
    "#be123c",
    "#4338ca",
    "#15803d",
];

function ExpensePieChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <EmptyState
                title="No category breakdown"
                description="Once category spending exists, this chart will show the distribution."
            />
        );
    }

    return (
        <div className="app-card p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-950">Category Distribution</h2>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="category"
                            outerRadius={110}
                            innerRadius={65}
                            paddingAngle={2}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`${entry.category}-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => formatCurrency(value)}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ExpensePieChart;
