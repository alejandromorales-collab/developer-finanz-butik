import { mockClients } from "@/data/mockClients";
import { Button } from "@/components/ui/button";
import { MagnifyingGlass, Plus, Eye } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const riskColors: Record<string, string> = {
  conservative: "bg-blue-100 text-blue-800",
  moderate: "bg-yellow-100 text-yellow-800",
  aggressive: "bg-red-100 text-red-800",
};

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const Clients = () => {
  const [search, setSearch] = useState("");
  const filtered = mockClients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-sm text-muted-foreground">{mockClients.length} managed clients</p>
        </div>
        <Button><Plus size={16} className="mr-1" /> Add Client</Button>
      </div>

      <div className="relative">
        <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..." className="pl-10" />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Client</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Invested</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Deals</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Risk</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Last Activity</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </td>
                <td className="px-4 py-3 text-right text-foreground">{fmt(c.totalInvested)}</td>
                <td className="px-4 py-3 text-center text-foreground">{c.activeDeals}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${riskColors[c.riskProfile]}`}>
                    {c.riskProfile}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-xs text-muted-foreground">{c.lastActivity}</td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="icon"><Eye size={16} /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
