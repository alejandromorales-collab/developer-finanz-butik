import { mockClients } from "@/data/mockClients";
import { Button } from "@/components/ui/button";
import { DownloadSimple, FilePdf, Calendar } from "@phosphor-icons/react";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const reportTemplates = [
  { id: "r1", name: "Monthly Portfolio Summary", desc: "Overview of all client portfolios and performance", lastGenerated: "2026-03-01" },
  { id: "r2", name: "Individual Client Report", desc: "Detailed report for a specific client", lastGenerated: "2026-02-28" },
  { id: "r3", name: "Investment Performance", desc: "Returns and projections across all managed assets", lastGenerated: "2026-02-15" },
  { id: "r4", name: "Risk Assessment", desc: "Risk profile distribution and recommendations", lastGenerated: "2026-02-10" },
];

const Reports = () => {
  const totalAUM = mockClients.reduce((s, c) => s + c.totalInvested, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Generate and download client portfolio reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Assets Under Management</p>
          <p className="mt-1 font-heading text-2xl font-bold text-foreground">{fmt(totalAUM)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Total Clients</p>
          <p className="mt-1 font-heading text-2xl font-bold text-foreground">{mockClients.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Reports Generated (this month)</p>
          <p className="mt-1 font-heading text-2xl font-bold text-foreground">12</p>
        </div>
      </div>

      {/* Report Templates */}
      <div className="space-y-3">
        <h2 className="font-heading text-lg font-semibold text-foreground">Report Templates</h2>
        {reportTemplates.map((r) => (
          <div key={r.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FilePdf size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading text-sm font-semibold text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
              <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Calendar size={10} /> Last generated: {r.lastGenerated}
              </div>
            </div>
            <Button variant="outline" size="sm">
              <DownloadSimple size={14} className="mr-1" /> Generate
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
