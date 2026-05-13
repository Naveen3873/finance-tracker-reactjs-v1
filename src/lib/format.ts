import type { Currency } from "@/types";

export const currencyMeta: Record<Currency, { symbol: string; rate: number; locale: string }> = {
  INR: { symbol: "₹", rate: 1, locale: "en-IN" },
  USD: { symbol: "$", rate: 0.012, locale: "en-US" },
  EUR: { symbol: "€", rate: 0.011, locale: "de-DE" },
  GBP: { symbol: "£", rate: 0.0095, locale: "en-GB" },
  AED: { symbol: "د.إ", rate: 0.044, locale: "ar-AE" },
};

export function money(value: number, currency: Currency) {
  const meta = currencyMeta[currency];
  return new Intl.NumberFormat(meta.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "INR" ? 0 : 2,
  }).format(value * meta.rate);
}

export function percent(value: number) {
  return `${Math.round(value)}%`;
}
