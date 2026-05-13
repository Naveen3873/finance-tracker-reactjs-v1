import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { dashboard: "Dashboard", transactions: "Transactions", analytics: "Analytics", budgets: "Budgets", goals: "Goals", wallets: "Wallets", settings: "Settings", profile: "Profile", income: "Income", expenses: "Expenses", savings: "Savings" } },
  hi: { translation: { dashboard: "डैशबोर्ड", transactions: "लेन-देन", analytics: "विश्लेषण", budgets: "बजट", goals: "लक्ष्य", wallets: "वॉलेट", settings: "सेटिंग्स", profile: "प्रोफाइल", income: "आय", expenses: "खर्च", savings: "बचत" } },
  ta: { translation: { dashboard: "டாஷ்போர்டு", transactions: "பரிவர்த்தனைகள்", analytics: "பகுப்பாய்வு", budgets: "பட்ஜெட்", goals: "இலக்குகள்", wallets: "பணப்பைகள்", settings: "அமைப்புகள்", profile: "சுயவிவரம்", income: "வருமானம்", expenses: "செலவுகள்", savings: "சேமிப்பு" } },
  ar: { translation: { dashboard: "لوحة التحكم", transactions: "المعاملات", analytics: "التحليلات", budgets: "الميزانيات", goals: "الأهداف", wallets: "المحافظ", settings: "الإعدادات", profile: "الملف الشخصي", income: "الدخل", expenses: "المصروفات", savings: "الادخار" } },
  es: { translation: { dashboard: "Panel", transactions: "Transacciones", analytics: "Analítica", budgets: "Presupuestos", goals: "Metas", wallets: "Billeteras", settings: "Ajustes", profile: "Perfil", income: "Ingresos", expenses: "Gastos", savings: "Ahorros" } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
