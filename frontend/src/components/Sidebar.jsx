import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();

    navigate("/", { replace: true });
  };

  const navLinkClass = ({ isActive }) =>
    [
      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
      isActive
        ? "bg-white/12 text-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.8)]"
        : "text-slate-300 hover:bg-white/8 hover:text-white",
    ].join(" ");

  return (
    <div className="border-b border-slate-800/60 bg-slate-950/96 text-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.9)] backdrop-blur md:min-h-screen md:w-72 md:border-b-0 md:border-r md:border-white/10">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 md:block md:px-6 md:py-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/80">
            Finance
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Expense Tracker
          </h2>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 md:hidden"
        >
          Logout
        </button>
      </div>

      <div className="px-4 pb-4 sm:px-6 md:flex md:min-h-[calc(100vh-7rem)] md:flex-col md:pb-6">
        <nav className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/transactions" className={navLinkClass}>
            Transactions
          </NavLink>
          <NavLink to="/categories" className={navLinkClass}>
            Categories
          </NavLink>
          <NavLink to="/budgets" className={navLinkClass}>
            Budgets
          </NavLink>
          <NavLink to="/reports" className={navLinkClass}>
            Reports
          </NavLink>
          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 hidden rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 px-4 py-3 font-semibold text-white shadow-lg shadow-rose-950/20 transition hover:brightness-110 md:block"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;