import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, CurrencyDollar, Briefcase, Wallet } from "@phosphor-icons/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { vendorAnalytics } from "@/data/mockVendor";

const stats = [
  { label: "Total Revenue", value: `$${vendorAnalytics.totalRevenue.toLocaleString()}`, icon: CurrencyDollar },
  { label: "Total Views", value: vendorAnalytics.totalViews.toLocaleString(), icon: Eye },
  { label: "Active Services", value: vendorAnalytics.activeServices, icon: Briefcase },
  { label: "Pending Payouts", value: `$${vendorAnalytics.pendingPayouts.toLocaleString()}`, icon: Wallet },
];

const VendorAnalytics = () => (
  <div className="space-y-8 max-w-5xl">
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">Analytics</h1>
      <p className="mt-1 text-sm text-muted-foreground">Performance and revenue insights</p>
    </div>

    {/* KPI Cards */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>

    {/* Revenue Trends */}
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vendorAnalytics.monthlyRevenue} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default VendorAnalytics;
