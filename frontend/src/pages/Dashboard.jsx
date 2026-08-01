import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";
import StatCard from "../components/StatCard";
import RecentTransactions from "../components/RecentTransactions";
import MonthlyExpenses from "../components/MonthlyExpenses";
import CategoryExpenses from "../components/CategoryExpenses";
import PageHeader from "../components/ui/PageHeader";
import { LoadingState } from "../components/ui/StateDisplay";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await getDashboard();
        setDashboardData(data);
      } catch {
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <LoadingState title="Loading dashboard" message="Fetching your latest balance, income, and spending insights." />;
  }

  if (error) {
    return (
      <div className="app-card p-6 text-center text-rose-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="A quick snapshot of your balance, income, expenses, and recent activity."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Balance" amount={dashboardData.balance} />
        <StatCard title="Income" amount={dashboardData.total_income} />
        <StatCard title="Expense" amount={dashboardData.total_expense} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentTransactions transactions={dashboardData.recent_transactions || []} />
        <MonthlyExpenses data={dashboardData.monthly_expenses || []} />
      </div>

      <CategoryExpenses data={dashboardData.category_expenses || []} />
    </div>
  );
}

export default Dashboard;
