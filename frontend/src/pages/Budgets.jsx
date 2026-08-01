import { useState, useEffect } from "react";
import {
  getBudgets,
  deleteBudget,
} from "../api/budgets";
import BudgetList from "../components/BudgetList";
import BudgetForm from "../components/BudgetForm";
import PageHeader from "../components/ui/PageHeader";
import { EmptyState, LoadingState } from "../components/ui/StateDisplay";
import { normalizeListResponse } from "../utils/formatters";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(normalizeListResponse(data));
    } catch {
      setError("Failed to fetch budgets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  if (loading) return <LoadingState title="Loading budgets" message="Gathering budget limits and monthly progress." />;
  if (error) return <div className="app-card p-6 text-center text-rose-700">{error}</div>;

  const handleCreateBudget = (newBudget) => {
    setBudgets((prevBudgets) => [newBudget, ...prevBudgets]);
  };

  const handleDeleteBudget = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this budget?",
    );
    if (!confirmDelete) return;

    try {
      await deleteBudget(id);
      setBudgets((prevBudgets) =>
        prevBudgets.filter((budget) => budget.id !== id),
      );
    } catch {
      setError("Failed to delete budget.");
    }
  };

  const handleUpdateBudget = (updatedBudget) => {
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) =>
        budget.id === updatedBudget.id ? updatedBudget : budget,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budgets"
        description="Set monthly spending limits and keep your financial goals in view."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <BudgetForm onCreate={handleCreateBudget} />

        {budgets.length ? (
          <BudgetList
            budgets={budgets}
            onUpdate={handleUpdateBudget}
            onDelete={handleDeleteBudget}
          />
        ) : (
          <EmptyState title="No budgets yet" description="Add a budget to see your spending targets here." />
        )}
      </div>
    </div>
  );
};

export default Budgets;
