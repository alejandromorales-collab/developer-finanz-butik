import type { ApiConfig, PaginatedResponse, Project, ProjectFilters, SimulatorResult } from "@/types/api";

// Configure your backend API base URL here
const DEFAULT_CONFIG: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
};

class ApiService {
  private config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_CONFIG) {
    this.config = config;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.config.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...this.config.headers,
        ...options?.headers,
      },
    });
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  }

  // Projects
  async getProjects(filters?: ProjectFilters): Promise<PaginatedResponse<Project>> {
    const params = new URLSearchParams();
    if (filters?.category) params.set("category", filters.category);
    if (filters?.status) params.set("status", filters.status);
    if (filters?.search) params.set("search", filters.search);
    const query = params.toString();
    return this.request(`/projects${query ? `?${query}` : ""}`);
  }

  async getProject(slug: string): Promise<Project> {
    return this.request(`/projects/${slug}`);
  }

  // Simulator
  async simulate(projectId: string, amount: number, years: number): Promise<SimulatorResult> {
    return this.request(`/projects/${projectId}/simulate`, {
      method: "POST",
      body: JSON.stringify({ amount, years }),
    });
  }
}

export const api = new ApiService();
