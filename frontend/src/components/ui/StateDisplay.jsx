function LoadingState({ title = "Loading", message = "Please wait while we load your data." }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-slate-200/80 bg-white/80 px-6 py-10 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{message}</p>
      </div>
    </div>
  );
}

function EmptyState({
  title = "Nothing here yet",
  description = "Once you add data, it will show up here.",
  action,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 px-6 py-12 text-center shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-2xl text-sky-700">
        •
      </div>
      <h2 className="mt-4 text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export { LoadingState, EmptyState };
