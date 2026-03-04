export interface PortfolioItem {
  id: string;
  projectName: string;
  category: string;
  invested: number;
  currentValue: number;
  returnRate: number;
  status: "active" | "matured" | "pending";
  startDate: string;
  endDate: string;
}

export const mockPortfolio: PortfolioItem[] = [
  { id: "p1", projectName: "Villa Residencial Costa del Sol", category: "Develop", invested: 50000, currentValue: 57250, returnRate: 14.5, status: "active", startDate: "2025-03-01", endDate: "2027-03-01" },
  { id: "p2", projectName: "Complejo Turístico Riviera Maya", category: "Buy", invested: 100000, currentValue: 109000, returnRate: 9.0, status: "active", startDate: "2025-06-15", endDate: "2028-06-15" },
  { id: "p3", projectName: "Fondo Deuda Corporativa Latam", category: "Lend", invested: 25000, currentValue: 26875, returnRate: 7.5, status: "matured", startDate: "2024-01-01", endDate: "2026-01-01" },
  { id: "p4", projectName: "Bonos Inmobiliarios MX", category: "Cash", invested: 30000, currentValue: 31950, returnRate: 6.5, status: "pending", startDate: "2026-01-15", endDate: "2027-01-15" },
];

export const portfolioSummary = {
  totalInvested: 205000,
  currentValue: 225075,
  totalReturn: 9.79,
  activeInvestments: 2,
  chartData: [
    { month: "Sep", value: 195000 },
    { month: "Oct", value: 199500 },
    { month: "Nov", value: 205000 },
    { month: "Dec", value: 210200 },
    { month: "Jan", value: 216800 },
    { month: "Feb", value: 220500 },
    { month: "Mar", value: 225075 },
  ],
};
