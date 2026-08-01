import BudgetCard from "./BudgetCard";
import { EmptyState } from "./ui/StateDisplay";

const BudgetList = ({ budgets, onUpdate, onDelete }) => {
  if (!budgets || budgets.length === 0) {
    return <EmptyState title="No budgets found" description="Create a budget to start tracking progress against monthly limits." />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          budget={budget}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BudgetList;