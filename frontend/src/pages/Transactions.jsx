import { useState, useEffect } from "react";
import {
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../api/transactions";
import RecentTransactions from "../components/RecentTransactions";
import TransactionForm from "../components/TransactionForm";
import PageHeader from "../components/ui/PageHeader";
import { EmptyState, LoadingState } from "../components/ui/StateDisplay";
import { normalizeListResponse } from "../utils/formatters";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(normalizeListResponse(data));
    } catch {
      setError("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <LoadingState title="Loading transactions" message="Pulling your latest spending history." />;
  if (error) {
    return <div className="app-card p-6 text-center text-rose-700">{error}</div>;
  }
  const handleDeleteTransaction = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTransaction(id);

      fetchTransactions();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const handleUpdateTransaction = async (id, updatedData) => {
    try {
      await updateTransaction(id, updatedData);

      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="Add, review, update, and remove income or expense entries."
      />

      <TransactionForm refreshTransactions={fetchTransactions} />

      {transactions.length ? (
        <RecentTransactions
          transactions={transactions}
          refreshTransactions={fetchTransactions}
          onDelete={handleDeleteTransaction}
          onUpdate={handleUpdateTransaction}
        />
      ) : (
        <EmptyState title="No transactions yet" description="Create your first transaction to start tracking your finances." />
      )}
    </div>
  );
};

export default Transactions;
