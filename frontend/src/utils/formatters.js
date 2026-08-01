export function normalizeListResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
}

export function formatCurrency(value, currencySymbol = "₹") {
  const numberValue = Number(value ?? 0);

  return `${currencySymbol}${numberValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function getErrorMessage(error, fallback = "Something went wrong.") {
  return (
    error?.response?.data?.detail ||
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    fallback
  );
}
