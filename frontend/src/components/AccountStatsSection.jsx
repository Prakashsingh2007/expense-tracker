import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";

function AccountStatsSection() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboard();

        setStats({
          balance: data.balance,
          totalIncome: data.total_income,
          totalExpense: data.total_expense,
          transactionCount: data.recent_transactions?.length || 0,
          categoryCount: data.category_expenses?.length || 0,
        });
      } catch {
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-5">Account Statistics</h2>

        <div className="grid grid-cols-2 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-5">Account Statistics</h2>
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: "Balance",
      value: `₹${Number(stats.balance).toFixed(2)}`,
      color: "border-purple-500",
      text: "text-purple-600",
    },
    {
      title: "Income",
      value: `₹${Number(stats.totalIncome).toFixed(2)}`,
      color: "border-green-500",
      text: "text-green-600",
    },
    {
      title: "Expenses",
      value: `₹${Number(stats.totalExpense).toFixed(2)}`,
      color: "border-red-500",
      text: "text-red-600",
    },
    {
      title: "Transactions",
      value: stats.transactionCount,
      color: "border-blue-500",
      text: "text-blue-600",
    },
    {
      title: "Categories",
      value: stats.categoryCount,
      color: "border-yellow-500",
      text: "text-yellow-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5">Account Statistics</h2>

      <div className="grid grid-cols-2 gap-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className={`bg-white border-l-4 ${card.color} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4`}
          >
            <p className="text-sm text-gray-500 font-medium">
              {card.title}
            </p>

            <h3 className={`text-2xl font-bold mt-2 ${card.text}`}>
              {card.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountStatsSection;