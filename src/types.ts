export type ThemeMode = "light" | "dark";
export type Language = "en" | "hi" | "ta" | "ar" | "es";
export type Currency = "INR" | "USD" | "EUR" | "GBP" | "AED";
export type TransactionType = "income" | "expense";

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget: number;
};

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  wallet: string;
  method: string;
  date: string;
  note?: string;
};

export type Budget = {
  id: string;
  category: string;
  spent: number;
  limit: number;
  color: string;
};

export type Goal = {
  id: string;
  title: string;
  target: number;
  saved: number;
  due: string;
  color: string;
};

export type Wallet = {
  id: string;
  name: string;
  balance: number;
  type: string;
  color: string;
};
