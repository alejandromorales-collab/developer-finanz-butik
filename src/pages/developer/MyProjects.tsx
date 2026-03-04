import { mockProjects } from "@/data/mockProjects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Eye, PencilSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const statusBadge: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  sold_out: "bg-red-100 text-red-800",
  coming_soon: "bg-yellow-100 text-yellow-800",
};

const MyProjects = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">My Projects</h1>
        <p className="text-sm text-muted-foreground">{mockProjects.length} projects published</p>
      </div>
      <Button asChild>
        <Link to="/developer/upload">
          <Plus size={18} className="mr-1" /> New Project
        </Link>
      </Button>
    </div>

    <div className="space-y-3">
      {mockProjects.map((p) => (
        <div key={p.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <img src={p.thumbnailUrl} alt={p.title} className="h-16 w-24 rounded-lg object-cover" />
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-sm font-semibold text-foreground truncate">{p.title}</h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-muted-foreground capitalize">{p.category}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusBadge[p.status]}`}>
                {p.status.replace("_", " ")}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {p.annualInterestRateMin}% – {p.annualInterestRateMax}% annual · Min {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(p.minInvestment)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/project/${p.slug}`}><Eye size={18} /></Link>
            </Button>
            <Button variant="ghost" size="icon">
              <PencilSimple size={18} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MyProjects;
