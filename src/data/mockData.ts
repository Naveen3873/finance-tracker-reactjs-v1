import type { Budget, Category, Goal, Transaction, Wallet } from "@/types";

export const categories: Category[] = [
  { id: "food", name: "Food", icon: "Utensils", color: "#10b981", budget: 17000 },
  { id: "travel", name: "Travel", icon: "Plane", color: "#6366f1", budget: 22000 },
  { id: "shopping", name: "Shopping", icon: "ShoppingBag", color: "#a855f7", budget: 14000 },
  { id: "bills", name: "Bills", icon: "Receipt", color: "#f59e0b", budget: 12000 },
  { id: "health", name: "Health", icon: "HeartPulse", color: "#ef4444", budget: 7000 },
  { id: "salary", name: "Salary", icon: "BriefcaseBusiness", color: "#14b8a6", budget: 0 },
];

export const transactions: Transaction[] = [
  { id: "t1", title: "Design consulting", amount: 148000, type: "income", category: "Salary", wallet: "HDFC Platinum", method: "Bank", date: "2026-05-12", note: "Monthly retainer" },
  { id: "t2", title: "Urban Company", amount: 2650, type: "expense", category: "Bills", wallet: "HDFC Platinum", method: "UPI", date: "2026-05-11" },
  { id: "t3", title: "Weekend dinner", amount: 4200, type: "expense", category: "Food", wallet: "CRED Card", method: "Card", date: "2026-05-10" },
  { id: "t4", title: "Flight to Dubai", amount: 31800, type: "expense", category: "Travel", wallet: "CRED Card", method: "Card", date: "2026-05-09" },
  { id: "t5", title: "Dividend payout", amount: 9300, type: "income", category: "Salary", wallet: "Zerodha", method: "Bank", date: "2026-05-08" },
  { id: "t6", title: "Nike store", amount: 7800, type: "expense", category: "Shopping", wallet: "Amex", method: "Card", date: "2026-05-07" },
  { id: "t7", title: "Health checkup", amount: 3600, type: "expense", category: "Health", wallet: "HDFC Platinum", method: "UPI", date: "2026-05-06" },
  { id: "t8", title: "Coffee meetings", amount: 1550, type: "expense", category: "Food", wallet: "Cash", method: "Cash", date: "2026-05-05" },
  { id: "t9", title: "SaaS subscription", amount: 2999, type: "expense", category: "Bills", wallet: "CRED Card", method: "Card", date: "2026-05-04" },
  { id: "t10", title: "Side project", amount: 52000, type: "income", category: "Salary", wallet: "HDFC Platinum", method: "Bank", date: "2026-05-03" },
];

export const budgets: Budget[] = [
  { id: "b1", category: "Food", spent: 10320, limit: 17000, color: "#10b981" },
  { id: "b2", category: "Travel", spent: 31800, limit: 45000, color: "#6366f1" },
  { id: "b3", category: "Shopping", spent: 7800, limit: 14000, color: "#a855f7" },
  { id: "b4", category: "Bills", spent: 5649, limit: 12000, color: "#f59e0b" },
];

export const goals: Goal[] = [
  { id: "g1", title: "Emergency fund", target: 600000, saved: 420000, due: "2026-12-31", color: "#10b981" },
  { id: "g2", title: "New car down payment", target: 900000, saved: 310000, due: "2027-03-15", color: "#6366f1" },
  { id: "g3", title: "Japan vacation", target: 360000, saved: 198000, due: "2026-11-20", color: "#a855f7" },
];

export const wallets: Wallet[] = [
  { id: "w1", name: "HDFC Platinum", balance: 482500, type: "Bank", color: "from-emerald-400 to-teal-600" },
  { id: "w2", name: "CRED Card", balance: -42650, type: "Credit", color: "from-indigo-500 to-violet-600" },
  { id: "w3", name: "Zerodha", balance: 1240000, type: "Investment", color: "from-slate-700 to-slate-950" },
  { id: "w4", name: "Cash", balance: 18200, type: "Cash", color: "from-amber-400 to-orange-500" },
];

export const monthlySeries = [
  { month: "Dec", income: 180000, expenses: 98000, savings: 82000 },
  { month: "Jan", income: 192000, expenses: 104000, savings: 88000 },
  { month: "Feb", income: 174000, expenses: 96000, savings: 78000 },
  { month: "Mar", income: 220000, expenses: 121000, savings: 99000 },
  { month: "Apr", income: 205000, expenses: 116000, savings: 89000 },
  { month: "May", income: 209300, expenses: 54600, savings: 154700 },
];

export const reminders = [
  "Don't forget to add today's expenses",
  "Track your spending habits today",
  "Update your monthly budget",
  "Review your subscriptions before month end",
];
