function ProfileStats({ stats }) {
  const cards = [
    {
      title: "Transactions",
      value: stats?.transactions ?? 0,
      color: "bg-blue-500",
    },
    {
      title: "Categories",
      value: stats?.categories ?? 0,
      color: "bg-green-500",
    },
    {
      title: "Budgets",
      value: stats?.budgets ?? 0,
      color: "bg-yellow-500",
    },
    {
      title: "Balance",
      value:
        stats?.balance !== undefined
          ? `₹${Number(stats.balance).toFixed(2)}`
          : "₹0.00",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        Account Statistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} text-white rounded-xl p-5 shadow`}
          >
            <h3 className="text-sm uppercase tracking-wide opacity-90">
              {card.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileStats;