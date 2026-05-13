import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Bell, ChartPie, CreditCard, Goal, HelpCircle, Landmark, LayoutDashboard, LogOut, Menu, Plus, ReceiptText, Settings, UserRound, WalletCards } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { reminders } from "@/data/mockData";
import { useFinanceStore } from "@/store/useFinanceStore";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "transactions", icon: ReceiptText },
  { to: "/analytics", label: "analytics", icon: ChartPie },
  { to: "/budgets", label: "budgets", icon: Landmark },
  { to: "/goals", label: "goals", icon: Goal },
  { to: "/wallets", label: "wallets", icon: WalletCards },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "settings", icon: Settings },
  { to: "/profile", label: "profile", icon: UserRound },
  { to: "/help", label: "Help", icon: HelpCircle },
];

const MIN_REMINDER_DELAY_MS = 60 * 60 * 1000;
const MAX_EXTRA_REMINDER_DELAY_MS = 30 * 60 * 1000;

function getNextReminderDelay() {
  return MIN_REMINDER_DELAY_MS + Math.floor(Math.random() * MAX_EXTRA_REMINDER_DELAY_MS);
}

export function Layout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isGuest, notifications, userName, theme, setTheme } = useFinanceStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (!notifications) return;
    let timeoutId: number;

    const scheduleReminder = () => {
      timeoutId = window.setTimeout(() => {
      const message = reminders[Math.floor(Math.random() * reminders.length)];
      toast(message, { description: "A tiny nudge for cleaner money habits." });
      if ("Notification" in window && Notification.permission === "granted") new Notification("Reminder", { body: message });
        scheduleReminder();
      }, getNextReminderDelay());
    };

    scheduleReminder();
    return () => window.clearTimeout(timeoutId);
  }, [notifications]);

  return (
    <div className="premium-gradient min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-slate-950/85 p-4 text-white shadow-2xl backdrop-blur-2xl lg:block">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-indigo-500 shadow-glow"><CreditCard className="h-5 w-5 text-slate-950" /></div>
          <div>
            <p className="text-lg font-extrabold">Naveen</p>
            <p className="text-xs text-slate-400">Personal Finance</p>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => cn("flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white", isActive && "bg-white/12 text-white shadow-inner")}>
                <Icon className="h-4 w-4" /> {t(item.label)}
              </NavLink>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-emerald-300/20 bg-gradient-to-br from-emerald-400/15 to-indigo-500/15 p-4">
          <p className="text-sm font-bold">{isGuest ? "Guest workspace" : `Hi, ${userName}`}</p>
          <p className="mt-1 text-xs text-slate-300">{isGuest ? "Register to save your financial data." : "All data is saved locally on this device."}</p>
          <Button className="mt-3 w-full" size="sm" variant="premium" onClick={() => navigate(isGuest ? "/register" : "/profile")}>{isGuest ? "Create account" : "Open profile"}</Button>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl lg:ml-72">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">May 2026</p>
              <h1 className="text-lg font-extrabold md:text-2xl">Financial command center</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => Notification.requestPermission?.()}><Bell className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><Settings className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/login")}><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="lg:ml-72"><Outlet /></div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-border bg-background/90 px-2 py-2 backdrop-blur-xl lg:hidden">
        {nav.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return <NavLink key={item.to} to={item.to} className={({ isActive }) => cn("flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold text-muted-foreground", isActive && "bg-primary/10 text-primary")}><Icon className="h-5 w-5" />{t(item.label)}</NavLink>;
        })}
      </nav>

      <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: .96 }} onClick={() => navigate("/transactions?add=1")} className="fixed bottom-24 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-300 to-indigo-500 text-slate-950 shadow-glow lg:bottom-8">
        <Plus className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
