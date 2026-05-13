import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Bell, CalendarDays, Check, ChevronDown, Download, Edit3, Globe2, Lock, Plus, Search, ShieldCheck, Trash2, Upload, WalletCards } from "lucide-react";
import { Page } from "@/components/Page";
import { AnalyticsBars, BudgetList, CategoryPie, InsightCard, OverviewChart, StatCard, WalletGrid } from "@/components/FinanceWidgets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { exportTransactionsCsv, exportTransactionsExcel } from "@/lib/export";
import { money } from "@/lib/format";
import { compactNumber } from "@/lib/utils";
import { useFinanceStore } from "@/store/useFinanceStore";
import type { Currency, Language, Transaction, TransactionType } from "@/types";
import i18n from "@/i18n";

function totals(transactions: Transaction[]) {
  const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  return { income, expenses, savings: income - expenses };
}

export function LandingPage() {
  const navigate = useNavigate();
  const setGuest = useFinanceStore((s) => s.setGuest);
  return (
    <main className="premium-gradient min-h-screen overflow-hidden">
      <section className="container grid min-h-screen items-center gap-10 py-10 lg:grid-cols-[1fr_.9fr]">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <p className="mb-4 inline-flex rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-500">Naveen Finance</p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-balance md:text-7xl">Premium money clarity for everyday decisions.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Track cashflow, budgets, goals, wallets, insights, exports, notifications, and multilingual preferences in one polished frontend-only app.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="premium" size="lg" onClick={() => navigate("/register")}>Start free</Button>
            <Button variant="outline" size="lg" onClick={() => { setGuest(true); navigate("/dashboard"); }}>Explore demo</Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }} className="glass rounded-[2rem] p-4">
          <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between"><p className="font-extrabold">May overview</p><span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-200">Live demo</span></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Income", "Expenses", "Savings"].map((x, i) => <div key={x} className="rounded-2xl bg-white/8 p-4"><p className="text-xs text-slate-400">{x}</p><p className="mt-4 text-2xl font-black">{["₹2.09L", "₹54.6K", "₹1.54L"][i]}</p></div>)}
            </div>
            <div className="mt-5 h-72"><OverviewChart /></div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function AuthFrame({ mode }: { mode: "login" | "register" | "forgot" | "otp" }) {
  const navigate = useNavigate();
  const { register: formRegister, handleSubmit } = useForm<{ name: string; email: string; password: string }>();
  const createUser = useFinanceStore((s) => s.register);
  const setGuest = useFinanceStore((s) => s.setGuest);
  const titles = { login: "Welcome back", register: "Create your Finance account", forgot: "Reset password", otp: "Verify your code" };
  return (
    <main className="premium-gradient grid min-h-screen place-items-center p-4">
      <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border bg-card shadow-2xl lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-emerald-950 p-8 text-white lg:block">
          <div className="flex items-center gap-3"><WalletCards className="h-8 w-8 text-emerald-300" /><span className="text-xl font-black">Naveen</span></div>
          <div className="mt-24 max-w-sm"><p className="text-4xl font-black leading-tight">Your money, beautifully organized.</p><p className="mt-5 text-slate-300">Animated analytics, local-first privacy, and export-ready reports.</p></div>
        </div>
        <form className="p-6 md:p-10" onSubmit={handleSubmit((values) => { if (mode === "register") createUser(values.name); else setGuest(false); navigate("/dashboard"); })}>
          <h1 className="text-3xl font-black">{titles[mode]}</h1>
          <p className="mt-2 text-muted-foreground">Frontend-only authentication UI with demo mode and local persistence.</p>
          <div className="mt-8 space-y-4">
            {mode === "register" && <Input placeholder="Full name" {...formRegister("name")} />}
            {mode !== "otp" && <Input placeholder="Email address" type="email" {...formRegister("email")} />}
            {(mode === "login" || mode === "register") && <Input placeholder="Password" type="password" {...formRegister("password")} />}
            {mode === "otp" && <Input placeholder="Enter 6-digit OTP" inputMode="numeric" />}
            <Button className="w-full" variant="premium" type="submit">{mode === "login" ? "Login" : mode === "register" ? "Create account" : "Continue"}</Button>
            <div className="grid grid-cols-2 gap-3"><Button variant="outline" type="button">Google</Button><Button variant="outline" type="button">Apple</Button></div>
            <Button className="w-full" variant="ghost" type="button" onClick={() => { setGuest(true); navigate("/dashboard"); }}>Continue as guest</Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm text-muted-foreground">
            <Link to="/forgot-password">Forgot password?</Link>
            <Link to={mode === "register" ? "/login" : "/register"}>{mode === "register" ? "Already registered?" : "Create account"}</Link>
            <Link to="/otp">OTP verification</Link>
          </div>
        </form>
      </motion.div>
    </main>
  );
}

export const LoginPage = () => <AuthFrame mode="login" />;
export const RegisterPage = () => <AuthFrame mode="register" />;
export const ForgotPage = () => <AuthFrame mode="forgot" />;
export const OtpPage = () => <AuthFrame mode="otp" />;

export function DashboardPage() {
  const { transactions, budgets, wallets, goals, currency, isGuest } = useFinanceStore();
  const sum = totals(transactions);
  return (
    <Page>
      <AnimatePresence>{isGuest && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex flex-col gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 md:flex-row md:items-center md:justify-between"><div><p className="font-bold">Register to save your financial data</p><p className="text-sm text-muted-foreground">Demo mode uses mock data and locks long-term persistence.</p></div><Button asChild variant="premium"><Link to="/register">Register now</Link></Button></motion.div>}</AnimatePresence>
      <div className="grid gap-4 md:grid-cols-3"><StatCard title="Income overview" value={money(sum.income, currency)} delta="+12.4% vs last month" tone="up" /><StatCard title="Expense overview" value={money(sum.expenses, currency)} delta="-8.1% optimized spend" tone="down" /><StatCard title="Savings overview" value={money(sum.savings, currency)} delta={`${compactNumber(sum.savings)} projected surplus`} tone="up" /></div>
      <div className="mt-5"><WalletGrid wallets={wallets} /></div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_.8fr]"><OverviewChart /><div className="space-y-5"><InsightCard /><CategoryPie transactions={transactions} /></div></div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2"><BudgetList budgets={budgets} /><Card className="glass"><CardHeader><CardTitle>Goal progress</CardTitle></CardHeader><CardContent className="space-y-5">{goals.map((goal) => <div key={goal.id}><div className="mb-2 flex justify-between text-sm"><span className="font-semibold">{goal.title}</span><span className="text-muted-foreground">{money(goal.saved, currency)}</span></div><Progress value={(goal.saved / goal.target) * 100} /></div>)}</CardContent></Card></div>
    </Page>
  );
}

function TransactionDialog({ existing }: { existing?: Transaction }) {
  const [open, setOpen] = useState(false);
  const { addTransaction, updateTransaction, categories } = useFinanceStore();
  const { register, handleSubmit, setValue, watch } = useForm<Omit<Transaction, "id">>({ defaultValues: existing || { title: "", amount: 0, type: "expense", category: "Food", wallet: "HDFC Platinum", method: "UPI", date: new Date().toISOString().slice(0, 10), note: "" } });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant={existing ? "ghost" : "premium"} size={existing ? "icon" : "md"}>{existing ? <Edit3 className="h-4 w-4" /> : <><Plus className="h-4 w-4" /> Add transaction</>}</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{existing ? "Edit transaction" : "Add income or expense"}</DialogTitle></DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit((values) => { if (existing) updateTransaction({ ...values, id: existing.id }); else addTransaction(values); toast.success("Transaction saved"); setOpen(false); })}>
          <Input placeholder="Title" {...register("title", { required: true })} />
          <Input placeholder="Amount" type="number" {...register("amount", { valueAsNumber: true })} />
          <div className="grid grid-cols-2 gap-3">
            <Select value={watch("type")} onValueChange={(v) => setValue("type", v as TransactionType)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem></SelectContent></Select>
            <Select value={watch("category")} onValueChange={(v) => setValue("category", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="grid grid-cols-2 gap-3"><Input placeholder="Wallet" {...register("wallet")} /><Input placeholder="Method" {...register("method")} /></div>
          <Input type="date" {...register("date")} />
          <Input placeholder="Notes" {...register("note")} />
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 text-sm text-muted-foreground"><Upload className="h-4 w-4" /> Receipt image upload UI only<input className="hidden" type="file" accept="image/*" /></label>
          <Button variant="premium" type="submit">Save transaction</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function TransactionsPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const { transactions, deleteTransaction, deleteAllTransactions, currency } = useFinanceStore();
  const filtered = transactions.filter((t) => (type === "all" || t.type === type) && `${t.title} ${t.category} ${t.method}`.toLowerCase().includes(query.toLowerCase()));
  const handleDeleteAll = () => {
    if (!window.confirm("Delete all transactions? This cannot be undone.")) return;
    deleteAllTransactions();
    toast.success("All transactions deleted");
  };
  return (
    <Page>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h2 className="text-3xl font-black">Transactions</h2><p className="text-muted-foreground">Search, filter, edit, delete, export, and attach receipt UI.</p></div><div className="flex flex-wrap gap-3"><Button variant="destructive" disabled={transactions.length === 0} onClick={handleDeleteAll}><Trash2 className="h-4 w-4" /> Delete all</Button><TransactionDialog /></div></div>
      {params.get("add") && <div className="mb-4"><TransactionDialog /></div>}
      <Card className="glass mb-5"><CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_180px_180px]"><div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="Search transactions" value={query} onChange={(e) => setQuery(e.target.value)} /></div><Select value={type} onValueChange={setType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem></SelectContent></Select><Button variant="outline" onClick={() => exportTransactionsCsv(filtered)}><Download className="h-4 w-4" /> CSV</Button></CardContent></Card>
      <div className="grid gap-3">
        {filtered.length === 0 && <Card className="glass p-10 text-center"><p className="font-bold">No transactions found</p><p className="text-sm text-muted-foreground">Try a different filter or add a new record.</p></Card>}
        {filtered.map((t) => <motion.div layout key={t.id} className="glass flex flex-col gap-3 rounded-2xl p-4 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary"><ChevronDown className={t.type === "income" ? "rotate-180" : ""} /></div><div><p className="font-bold">{t.title}</p><p className="text-sm text-muted-foreground">{t.category} • {t.method} • {t.date}</p></div></div><div className="flex items-center justify-between gap-2 md:justify-end"><p className={`font-black ${t.type === "income" ? "text-emerald-500" : ""}`}>{t.type === "income" ? "+" : "-"}{money(t.amount, currency)}</p><TransactionDialog existing={t} /><Button variant="ghost" size="icon" onClick={() => deleteTransaction(t.id)}><Trash2 className="h-4 w-4" /></Button></div></motion.div>)}
      </div>
    </Page>
  );
}

export function AnalyticsPage() {
  const transactions = useFinanceStore((s) => s.transactions);
  return <Page><h2 className="mb-5 text-3xl font-black">Analytics</h2><div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]"><AnalyticsBars /><CategoryPie transactions={transactions} /></div><div className="mt-5 grid gap-5 md:grid-cols-3"><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /></div></Page>;
}

export function BudgetsPage() {
  const { budgets, categories } = useFinanceStore();
  return <Page><h2 className="mb-5 text-3xl font-black">Budgets & categories</h2><div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><BudgetList budgets={budgets} /><Card className="glass"><CardHeader><CardTitle>Custom category system</CardTitle></CardHeader><CardContent className="space-y-3">{categories.map((c, index) => <div key={c.id} draggable className="flex items-center justify-between rounded-2xl border bg-background/70 p-3"><div className="flex items-center gap-3"><span className="h-4 w-4 rounded-full" style={{ background: c.color }} /><span className="font-semibold">{index + 1}. {c.name}</span></div><span className="text-sm text-muted-foreground">Budget ready</span></div>)}<Button variant="premium"><Plus className="h-4 w-4" /> Create category</Button></CardContent></Card></div></Page>;
}

export function GoalsPage() {
  const { goals, currency } = useFinanceStore();
  return <Page><h2 className="mb-5 text-3xl font-black">Financial goals</h2><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{goals.map((goal) => <Card key={goal.id} className="glass"><CardHeader><CardTitle>{goal.title}</CardTitle></CardHeader><CardContent><p className="text-3xl font-black">{money(goal.saved, currency)}</p><p className="mb-4 mt-1 text-sm text-muted-foreground">Target {money(goal.target, currency)} by {goal.due}</p><Progress value={(goal.saved / goal.target) * 100} /></CardContent></Card>)}</div></Page>;
}

export function WalletsPage() {
  const wallets = useFinanceStore((s) => s.wallets);
  return <Page><h2 className="mb-5 text-3xl font-black">Wallets</h2><WalletGrid wallets={wallets} /><div className="mt-5"><InsightCard /></div></Page>;
}

export function NotificationsPage() {
  const { notifications, setNotifications } = useFinanceStore();
  return <Page><h2 className="mb-5 text-3xl font-black">Notifications</h2><Card className="glass max-w-2xl"><CardContent className="space-y-5 p-6"><div className="flex items-center justify-between"><div><p className="font-bold">Random reminder popups</p><p className="text-sm text-muted-foreground">Browser notifications and animated toasts for finance nudges.</p></div><Switch checked={notifications} onCheckedChange={setNotifications} /></div><Button variant="premium" onClick={() => toast("Don't forget to add today's expenses")}>Preview reminder</Button></CardContent></Card></Page>;
}

export function SettingsPage() {
  const state = useFinanceStore();
  return (
    <Page>
      <h2 className="mb-5 text-3xl font-black">Settings</h2>
      <Card className="glass max-w-3xl"><CardContent className="grid gap-5 p-6 md:grid-cols-2">
        <div><Label>Currency</Label><Select value={state.currency} onValueChange={(v) => state.setCurrency(v as Currency)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["INR","USD","EUR","GBP","AED"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Language</Label><Select value={state.language} onValueChange={(v) => { state.setLanguage(v as Language); i18n.changeLanguage(v); }}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="hi">Hindi</SelectItem><SelectItem value="ta">Tamil</SelectItem><SelectItem value="ar">Arabic</SelectItem><SelectItem value="es">Spanish</SelectItem></SelectContent></Select></div>
        <div><Label>Theme mode</Label><Select value={state.theme} onValueChange={(v) => state.setTheme(v as "light" | "dark")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dark">Dark</SelectItem><SelectItem value="light">Light</SelectItem></SelectContent></Select></div>
        <div><Label>Accent color</Label><Input type="color" value={state.accent} onChange={(e) => state.setAccent(e.target.value)} /></div>
        <div className="flex items-center justify-between rounded-2xl border p-4 md:col-span-2"><span>Notification preferences</span><Switch checked={state.notifications} onCheckedChange={state.setNotifications} /></div>
        <div className="rounded-2xl border p-4"><p className="font-bold">Dashboard layout</p><p className="text-sm text-muted-foreground">Compact analytical layout</p></div><div className="rounded-2xl border p-4"><p className="font-bold">Date & time</p><p className="text-sm text-muted-foreground">24h • DD/MM/YYYY</p></div>
      </CardContent></Card>
    </Page>
  );
}

export function ProfilePage() {
  const { userName, transactions, currency } = useFinanceStore();
  const sum = totals(transactions);
  return <Page><h2 className="mb-5 text-3xl font-black">Profile</h2><div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><Card className="glass"><CardContent className="p-6 text-center"><div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-emerald-300 to-indigo-500 text-3xl font-black text-slate-950">{userName[0]}</div><h3 className="mt-4 text-2xl font-black">{userName}</h3><p className="text-muted-foreground">Premium local-first account</p><div className="mt-5 grid grid-cols-3 gap-3 text-center"><span><b>{transactions.length}</b><small className="block text-muted-foreground">records</small></span><span><b>8</b><small className="block text-muted-foreground">badges</small></span><span><b>94</b><small className="block text-muted-foreground">score</small></span></div></CardContent></Card><Card className="glass"><CardHeader><CardTitle>Financial summary & exports</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-4xl font-black">{money(sum.savings, currency)}</p><div className="flex flex-wrap gap-3"><Button onClick={() => exportTransactionsCsv(transactions)}><Download className="h-4 w-4" /> Export CSV</Button><Button variant="outline" onClick={() => exportTransactionsExcel(transactions)}>Excel report</Button></div><div className="space-y-3">{["Budget strategist", "Savings streak", "Clean ledger"].map((b) => <div key={b} className="flex items-center gap-3 rounded-2xl border p-3"><ShieldCheck className="h-5 w-5 text-emerald-500" />{b}</div>)}</div></CardContent></Card></div></Page>;
}

export function HelpPage() {
  return <Page><h2 className="mb-5 text-3xl font-black">Help Center</h2><div className="grid gap-4 md:grid-cols-3">{["Local storage privacy", "Exporting reports", "Guest limitations"].map((x) => <Card key={x} className="glass"><CardContent className="p-6"><Globe2 className="mb-4 h-6 w-6 text-primary" /><p className="font-bold">{x}</p><p className="mt-2 text-sm text-muted-foreground">Clear guidance for using the frontend-only finance workspace.</p></CardContent></Card>)}</div></Page>;
}

export function NotFoundPage() {
  return <main className="premium-gradient grid min-h-screen place-items-center p-4 text-center"><div><p className="text-8xl font-black">404</p><p className="mt-4 text-xl font-bold">That page is off the ledger.</p><Button asChild className="mt-6" variant="premium"><Link to="/dashboard">Return dashboard</Link></Button></div></main>;
}
