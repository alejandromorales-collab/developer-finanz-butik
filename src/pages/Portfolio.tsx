import Navbar from "@/components/Navbar";
import { mockPortfolio, portfolioSummary } from "@/data/mockPortfolio";
import { Badge } from "@/components/ui/badge";
import { TrendUp, TrendDown, Wallet, ChartLine, ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  matured: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

const Portfolio = () => {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-10 space-y-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">My Portfolio</h1>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Invested", value: fmt(portfolioSummary.totalInvested), icon: Wallet },
            { label: "Current Value", value: fmt(portfolioSummary.currentValue), icon: ChartLine },
            { label: "Total Return", value: `+${portfolioSummary.totalReturn}%`, icon: TrendUp },
            { label: "Active Investments", value: String(portfolioSummary.activeInvestments), icon: ArrowRight },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <c.icon size={18} />
                <span className="text-xs font-medium">{c.label}</span>
              </div>
              <p className="mt-2 font-heading text-2xl font-bold text-foreground">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Portfolio Chart (simple SVG) */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">Portfolio Growth</h2>
          <div className="h-48 w-full">
            <svg viewBox="0 0 700 180" className="h-full w-full">
              <defs>
                <linearGradient id="pgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              {(() => {
                const d = portfolioSummary.chartData;
                const min = Math.min(...d.map((p) => p.value)) * 0.98;
                const max = Math.max(...d.map((p) => p.value)) * 1.02;
                const pts = d.map((p, i) => ({
                  x: (i / (d.length - 1)) * 660 + 20,
                  y: 160 - ((p.value - min) / (max - min)) * 140,
                }));
                const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
                const area = `${line} L${pts[pts.length - 1].x},170 L${pts[0].x},170 Z`;
                return (
                  <>
                    <path d={area} fill="url(#pgGrad)" />
                    <path d={line} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
                    {pts.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} r="4" fill="hsl(var(--primary))" />
                        <text x={p.x} y="178" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                          {d[i].month}
                        </text>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Investments Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Project</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Invested</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Current</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Return</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockPortfolio.map((item) => (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">{item.projectName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                    <td className="px-4 py-3 text-right text-foreground">{fmt(item.invested)}</td>
                    <td className="px-4 py-3 text-right text-foreground">{fmt(item.currentValue)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="flex items-center justify-end gap-1 text-green-600">
                        <TrendUp size={14} />+{item.returnRate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
