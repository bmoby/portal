export function getDonationAlertsUrl(
  amount?: number,
  currency: string = "EUR"
): string {
  const base = "https://www.donationalerts.com/r/tsarag";
  const params = new URLSearchParams();

  if (typeof amount === "number" && amount > 0) {
    // Try multiple common parameter names; DonationAlerts will ignore unknown ones
    params.set("amount", String(amount));
    params.set("sum", String(amount));
    params.set("default_amount", String(amount));
  }

  if (currency) {
    params.set("currency", currency);
    params.set("currency_code", currency);
    params.set("cur", currency);
  }

  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

// Removed recent-donations related types and fetch to simplify codebase per request
