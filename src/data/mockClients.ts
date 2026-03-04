export interface ManagedClient {
  id: string;
  name: string;
  email: string;
  totalInvested: number;
  activeDeals: number;
  riskProfile: "conservative" | "moderate" | "aggressive";
  lastActivity: string;
  avatar?: string;
}

export const mockClients: ManagedClient[] = [
  { id: "c1", name: "Roberto Fernández", email: "roberto@email.com", totalInvested: 250000, activeDeals: 3, riskProfile: "moderate", lastActivity: "2026-03-02" },
  { id: "c2", name: "Laura Sánchez", email: "laura@email.com", totalInvested: 500000, activeDeals: 5, riskProfile: "aggressive", lastActivity: "2026-03-01" },
  { id: "c3", name: "Diego Morales", email: "diego@email.com", totalInvested: 120000, activeDeals: 2, riskProfile: "conservative", lastActivity: "2026-02-28" },
  { id: "c4", name: "Valentina Ruiz", email: "valentina@email.com", totalInvested: 80000, activeDeals: 1, riskProfile: "moderate", lastActivity: "2026-02-25" },
];

export const managerBrand = {
  companyName: "Wealth Advisory Co.",
  primaryColor: "#0E8B71",
  logo: "",
  domain: "wealth-advisory.finanzbutik.com",
};
