import axiosInstance from "./axios";

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

export const normalizeReportData = (data = {}) => ({
  total_income: toNumber(data.total_income),
  total_expense: toNumber(data.total_expense),
  balance: toNumber(data.balance),
  category_expenses: (data.category_expenses || []).map((item) => ({
    category: item.category ?? item.category__name ?? "Uncategorized",
    amount: toNumber(item.amount),
  })),
  monthly: (data.monthly || []).map((item) => ({
    month: item.month,
    expense: toNumber(item.expense),
  })),
  top_expenses: (data.top_expenses || []).map((item) => ({
    ...item,
    amount: toNumber(item.amount),
  })),
});

export const getReports = async (params = {}) => {
  const query = {};

  if (params.year) query.year = params.year;
  if (params.month) query.month = params.month;

  const response = await axiosInstance.get("/reports/", { params: query });
  return normalizeReportData(response.data);
};
