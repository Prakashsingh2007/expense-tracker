function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
          Expense Tracker
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex items-center">{action}</div> : null}
    </div>
  );
}

export default PageHeader;
