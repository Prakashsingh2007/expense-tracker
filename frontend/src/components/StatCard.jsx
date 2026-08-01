function StatCard({ title, amount }) {
  return (
    <div className="app-card p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_60px_-35px_rgba(15,23,42,0.45)]">
      <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{title}</h3>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">₹{amount}</p>
    </div>
  );
}

export default StatCard;
