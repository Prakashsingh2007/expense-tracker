function ReportFilters({ year, month, onYearChange, onMonthChange }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index);
  const months = [
    { value: "", label: "All months" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <div className="app-card flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
      <label className="flex flex-1 flex-col gap-1 text-sm text-slate-600">
        Year
        <select
          value={year}
          onChange={(event) => onYearChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-400"
        >
          <option value="">All years</option>
          {years.map((value) => (
            <option key={value} value={String(value)}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-1 flex-col gap-1 text-sm text-slate-600">
        Month
        <select
          value={month}
          onChange={(event) => onMonthChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-400"
        >
          {months.map((item) => (
            <option key={item.value || "all"} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ReportFilters;
