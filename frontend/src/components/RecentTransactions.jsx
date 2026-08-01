import TransactionCard from "./TransactionCard";
import { EmptyState } from "./ui/StateDisplay";

function RecentTransactions({
  transactions,
  onUpdate,
  onDelete,
}) {
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions yet"
        description="Add your first income or expense to start filling this activity feed."
      />
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default RecentTransactions;