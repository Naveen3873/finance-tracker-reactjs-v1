import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import {
  AnalyticsPage,
  BudgetsPage,
  DashboardPage,
  ForgotPage,
  GoalsPage,
  HelpPage,
  LandingPage,
  LoginPage,
  NotFoundPage,
  NotificationsPage,
  OtpPage,
  ProfilePage,
  RegisterPage,
  SettingsPage,
  TransactionsPage,
  WalletsPage,
} from "@/pages/AppPages";

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/wallets" element={<WalletsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}
