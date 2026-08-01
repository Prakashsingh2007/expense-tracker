function escapeCsv(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

export function exportReportToCsv(report, { year, month } = {}) {
  if (!report) return;

  const periodLabel = [
    year || "all-years",
    month || "all-months",
  ].join("-");

  const lines = [
    ["Metric", "Value"],
    ["Total Income", report.total_income],
    ["Total Expense", report.total_expense],
    ["Balance", report.balance],
    [],
    ["Category", "Amount"],
    ...(report.category_expenses || []).map((item) => [item.category, item.amount]),
    [],
    ["Period", "Expense"],
    ...(report.monthly || []).map((item) => [item.month, item.expense]),
  ];

  const csv = lines
    .map((row) => (row.length ? row.map(escapeCsv).join(",") : ""))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `expense-report-${periodLabel}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
