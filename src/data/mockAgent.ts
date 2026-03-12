export const agentProfile = {
  id: "agt-1",
  name: "Sofía Torres",
  company: "Torres Capital Partners",
  email: "sofia@agentpro.com",
  bio: "Especialista en distribución de productos financieros alternativos con +8 años de experiencia en mercados LATAM.",
  agentCode: "FB-2026-XYZ",
  avatar: "",
  tcAccepted: true,
  status: "active" as const,
};

export const agentStats = {
  totalCommissions: 34_520,
  closedDeals: 12,
  codeRedemptions: 47,
  pendingAttributions: 5,
  conversionRate: 25.5,
};

export const pendingAttributions = [
  { id: "attr-1", investorName: "Luis García", project: "Villa Costa del Sol", amount: 50_000, date: "2026-02-28", status: "pending" as const },
  { id: "attr-2", investorName: "Ana Martínez", project: "Fondo Deuda Latam", amount: 25_000, date: "2026-03-01", status: "pending" as const },
  { id: "attr-3", investorName: "Roberto Díaz", project: "Riviera Maya", amount: 100_000, date: "2026-03-05", status: "pending" as const },
  { id: "attr-4", investorName: "Carmen Vega", project: "Villa Costa del Sol", amount: 75_000, date: "2026-03-08", status: "pending" as const },
  { id: "attr-5", investorName: "Pedro Sánchez", project: "Fondo Deuda Latam", amount: 30_000, date: "2026-03-10", status: "pending" as const },
];

export const agentCodeUsageWeekly = [
  { week: "W1 Feb", uses: 5 },
  { week: "W2 Feb", uses: 8 },
  { week: "W3 Feb", uses: 6 },
  { week: "W4 Feb", uses: 11 },
  { week: "W1 Mar", uses: 9 },
  { week: "W2 Mar", uses: 14 },
];

export const agentCodeUsageMonthly = [
  { month: "Oct", uses: 12 },
  { month: "Nov", uses: 18 },
  { month: "Dec", uses: 15 },
  { month: "Jan", uses: 22 },
  { month: "Feb", uses: 30 },
  { month: "Mar", uses: 23 },
];

export const topProjectsByReferral = [
  { project: "Villa Costa del Sol", referrals: 18, commissions: 12_400, category: "buy" as const },
  { project: "Fondo Deuda Latam", referrals: 14, commissions: 9_800, category: "lend" as const },
  { project: "Riviera Maya", referrals: 10, commissions: 8_200, category: "develop" as const },
  { project: "Cash Plus MXN", referrals: 5, commissions: 4_120, category: "cash" as const },
];

export const mediaKitItems = [
  { id: "mk-1", name: "Brand Deck (PDF)", type: "pdf", size: "2.4 MB" },
  { id: "mk-2", name: "Social Media Kit", type: "zip", size: "8.1 MB" },
  { id: "mk-3", name: "Email Templates", type: "zip", size: "1.2 MB" },
  { id: "mk-4", name: "One-Pager Brochure", type: "pdf", size: "3.5 MB" },
];
