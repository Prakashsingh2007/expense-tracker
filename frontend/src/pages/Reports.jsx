import { useEffect, useState } from "react";
import { getReports } from "../api/reports";

import SummaryCards from "../components/reports/SummaryCards";
import ExpensePieChart from "../components/reports/ExpensePieChart";
import IncomeExpenseBarChart from "../components/reports/IncomeExpenseBarChart";
import MonthlyTrendChart from "../components/reports/MonthlyTrendChart";
import ReportFilters from "../components/reports/ReportFilters";
import { exportReportToCsv } from "../components/reports/exportReport";
import PageHeader from "../components/ui/PageHeader";
import { LoadingState } from "../components/ui/StateDisplay";

function Reports() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");

    useEffect(() => {
        let cancelled = false;

        const loadReport = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getReports({
                    year: year || undefined,
                    month: month || undefined,
                });
                if (!cancelled) {
                    setReport(data);
                }
            } catch {
                if (!cancelled) {
                    setError("Failed to load reports.");
                    setReport(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadReport();

        return () => {
            cancelled = true;
        };
    }, [year, month]);

    const trendTitle = year && month
        ? "Daily Expense Trend"
        : "Monthly Expense Trend";

    if (loading && !report) {
        return <LoadingState title="Loading reports" message="Preparing charts and summary metrics." />;
    }

    if (error && !report) {
        return <div className="app-card p-6 text-center text-rose-700">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Reports"
                description="Review trends, categories, and high-level financial performance."
                action={
                    <button
                        type="button"
                        onClick={() => exportReportToCsv(report, { year, month })}
                        disabled={!report}
                        className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Export CSV
                    </button>
                }
            />

            <ReportFilters
                year={year}
                month={month}
                onYearChange={setYear}
                onMonthChange={(nextMonth) => {
                    setMonth(nextMonth);
                    if (nextMonth && !year) {
                        setYear(String(new Date().getFullYear()));
                    }
                }}
            />

            {error ? (
                <div className="app-card p-4 text-center text-rose-700">{error}</div>
            ) : null}

            {loading ? (
                <LoadingState title="Updating reports" message="Refreshing charts for the selected period." />
            ) : (
                <>
                    <SummaryCards report={report} />

                    <div className="grid gap-6 xl:grid-cols-2">
                        <ExpensePieChart data={report?.category_expenses || []} />
                        <IncomeExpenseBarChart report={report} />
                    </div>

                    <MonthlyTrendChart
                        data={report?.monthly || []}
                        title={trendTitle}
                    />
                </>
            )}
        </div>
    );
}

export default Reports;
