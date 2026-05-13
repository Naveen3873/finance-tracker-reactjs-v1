import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Area, AreaChart, CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { monthlySeries } from "@/data/mockData";
import { money } from "@/lib/format";
import { useFinanceStore } from "@/store/useFinanceStore";
import type { Budget, Transaction, Wallet } from "@/types";

export function StatCard({ title, value, delta, tone }: { title: string; value: string; delta: string; tone: "up" | "down" | "neutral" }) {
  const Icon = tone === "down" ? ArrowDownRight : ArrowUpRight;
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
      <Card className="glass overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="mt-3 text-2xl font-extrabold md:text-3xl">{value}</p>
            </div>
            <span className="rounded-2xl bg-primary/10 p-3 text-primary"><Icon className="h-5 w-5" /></span>
          </div>
          <p className="mt-4 text-sm font-semibold text-muted-foreground">{delta}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function OverviewChart() {
  const currency = useFinanceStore((s) => s.currency);
  return (
    <Card className="glass">
      <CardHeader><CardTitle>Monthly cashflow</CardTitle></CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlySeries}>
            <defs>
              <linearGradient id="income" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
              <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.45}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.08} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => money(Number(v), currency).replace(/\.00$/, "")} width={80} />
            <Tooltip formatter={(v) => money(Number(v), currency)} contentStyle={{ borderRadius: 16, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
            <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#income)" strokeWidth={3} />
            <Area type="monotone" dataKey="expenses" stroke="#8b5cf6" fill="url(#expenses)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CategoryPie({ transactions }: { transactions: Transaction[] }) {
  const totals = transactions.filter((t) => t.type === "expense").reduce<Record<string, number>>((acc, t) => ({ ...acc, [t.category]: (acc[t.category] || 0) + t.amount }), {});
  const colors = ["#10b981", "#6366f1", "#a855f7", "#f59e0b", "#ef4444"];
  const data = Object.entries(totals).map(([name, value], index) => ({ name, value, fill: colors[index % colors.length] }));
  return (
    <Card className="glass">
      <CardHeader><CardTitle>Spending mix</CardTitle></CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={55} outerRadius={92} paddingAngle={4} dataKey="value">
              {data.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function BudgetList({ budgets }: { budgets: Budget[] }) {
  const currency = useFinanceStore((s) => s.currency);
  return (
    <Card className="glass">
      <CardHeader><CardTitle>Budget tracking</CardTitle></CardHeader>
      <CardContent className="space-y-5">
        {budgets.map((budget) => {
          const value = Math.min(100, (budget.spent / budget.limit) * 100);
          return (
            <div key={budget.id}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold">{budget.category}</span>
                <span className="text-muted-foreground">{money(budget.spent, currency)} / {money(budget.limit, currency)}</span>
              </div>
              <Progress value={value} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function WalletGrid({ wallets }: { wallets: Wallet[] }) {
  const currency = useFinanceStore((s) => s.currency);
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {wallets.map((wallet) => (
        <motion.div key={wallet.id} whileHover={{ y: -5, rotate: -.3 }} className={`rounded-3xl bg-gradient-to-br ${wallet.color} p-5 text-white shadow-soft`}>
          <p className="text-sm opacity-80">{wallet.type}</p>
          <p className="mt-1 font-bold">{wallet.name}</p>
          <p className="mt-8 text-2xl font-extrabold">{money(wallet.balance, currency)}</p>
          <div className="mt-4 flex justify-between text-xs opacity-80"><span>•••• 4821</span><span>05/29</span></div>
        </motion.div>
      ))}
    </div>
  );
}

export function InsightCard() {
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-emerald-950 text-white shadow-glow">
      <CardContent className="p-6">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
        <p className="text-lg font-extrabold">AI-style insight</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">Your dining spend is 18% lower than last month. Moving that surplus into the Japan vacation goal could pull the target date forward by 3 weeks.</p>
      </CardContent>
    </Card>
  );
}

export function AnalyticsBars() {
  return (
    <Card className="glass">
      <CardHeader><CardTitle>Income vs expenses</CardTitle></CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlySeries}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.08} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
