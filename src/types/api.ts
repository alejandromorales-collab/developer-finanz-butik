// ===== Finanz Butik API Types =====
// Ready to connect to your backend API

export interface Project {
  id: string;
  title: string;
  slug: string;
  status: "active" | "sold_out" | "coming_soon" | "waiting_approval";
  category: "cash" | "lend" | "buy" | "develop";
  thumbnailUrl: string;
  images: string[];
  termRange: string;
  annualInterestRateMin: number;
  annualInterestRateMax: number;
  minInvestment: number;
  currency: string;
  description: string;
  highlights: string[];
  curatedBy: string;
  legalSupport: boolean;
  tiers: InvestmentTier[];
  documents: ProjectDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface InvestmentTier {
  id: string;
  name: string;
  years: number;
  ranges: TierRange[];
}

export interface TierRange {
  minAmount: number;
  maxAmount: number | null;
  interestRate: number;
}

export interface ProjectDocument {
  id: string;
  name: string;
  date: string;
  downloadUrl: string;
}

export interface SimulatorResult {
  investmentAmount: number;
  projectedValue: number;
  gain: number;
  gainPercentage: number;
  years: number;
  chartData: ChartPoint[];
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface ProjectFilters {
  category?: Project["category"];
  status?: Project["status"];
  search?: string;
}

// ===== Finanz Backend Types =====

export interface HealthResponse {
  status: string;
  database: string;
}

export interface CategoryResponse {
  _id: string;
  name: string;
}

export interface PricingResponse {
  _id: string;
  name: string;
}

// ===== API Service Interface =====

export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
