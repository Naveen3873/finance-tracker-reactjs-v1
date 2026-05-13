import { create } from "zustand";
import { persist } from "zustand/middleware";
import { budgets, categories, goals, transactions, wallets } from "@/data/mockData";
import type { Budget, Category, Currency, Goal, Language, ThemeMode, Transaction, Wallet } from "@/types";

type FinanceState = {
  isGuest: boolean;
  userName: string;
  theme: ThemeMode;
  language: Language;
  currency: Currency;
  accent: string;
  notifications: boolean;
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  goals: Goal[];
  wallets: Wallet[];
  setGuest: (value: boolean) => void;
  register: (name: string) => void;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
  setAccent: (accent: string) => void;
  setNotifications: (value: boolean) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  deleteAllTransactions: () => void;
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  reorderCategories: (from: number, to: number) => void;
};

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      isGuest: true,
      userName: "Naveen",
      theme: "dark",
      language: "en",
      currency: "INR",
      accent: "#10b981",
      notifications: true,
      transactions,
      categories,
      budgets,
      goals,
      wallets,
      setGuest: (value) =>
        set(
          value
            ? {
                isGuest: true,
                transactions,
                budgets,
                goals,
                wallets,
                categories,
              }
            : { isGuest: false },
        ),
      register: (name) =>
        set({
          isGuest: false,
          userName: name || "Naveen",
          transactions: [],
          budgets: [],
          goals: [],
          wallets: [],
          categories,
        }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
      setAccent: (accent) => set({ accent }),
      setNotifications: (value) => set({ notifications: value }),
      addTransaction: (transaction) =>
        set((state) => ({ transactions: [{ ...transaction, id: crypto.randomUUID() }, ...state.transactions] })),
      updateTransaction: (transaction) =>
        set((state) => ({ transactions: state.transactions.map((item) => (item.id === transaction.id ? transaction : item)) })),
      deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter((item) => item.id !== id) })),
      deleteAllTransactions: () => set({ transactions: [] }),
      addCategory: (category) => set((state) => ({ categories: [...state.categories, { ...category, id: crypto.randomUUID() }] })),
      updateCategory: (category) =>
        set((state) => ({ categories: state.categories.map((item) => (item.id === category.id ? category : item)) })),
      deleteCategory: (id) => set((state) => ({ categories: state.categories.filter((item) => item.id !== id) })),
      reorderCategories: (from, to) =>
        set((state) => {
          const next = [...state.categories];
          const [moved] = next.splice(from, 1);
          next.splice(to, 0, moved);
          return { categories: next };
        }),
    }),
    { name: "velora-finance-store" },
  ),
);
