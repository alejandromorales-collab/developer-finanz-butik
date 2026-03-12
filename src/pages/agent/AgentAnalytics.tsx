import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { agentCodeUsageWeekly, agentCodeUsageMonthly, topProjectsByReferral, agentStats } from "@/data/mockAgent";
import { TrendUp, ChartBar } from "@phosphor-icons/react";

const categoryColors: Record<string, string> = {
  cash: "bg-[hsl(var(--teal-light))] text-primary",
  lend: "bg-primary/10 text-primary",
  buy: "bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]",
  develop: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
};

const AgentAnalytics = () => {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly");
  const chartData = timeframe === "weekly" ? agentCodeUsageWeekly : agentCodeUsageMonthly;
  const xKey = timeframe === "weekly" ? "week" : "month";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Agent Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Rendimiento de tu código y referidos en el tiempo</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <TrendUp size={20} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Tasa de Conversión</p>
              <p className="text-xl font-bold font-heading text-foreground">{agentStats.conversionRate}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <ChartBar size={20} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total Referidos</p>
              <p className="text-xl font-bold font-heading text-foreground">{agentStats.codeRedemptions}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <TrendUp size={20} className="text-[hsl(var(--success))]" />
            <div>
              <p className="text-xs text-muted-foreground">Deals Cerrados</p>
              <p className="text-xl font-bold font-heading text-foreground">{agentStats.closedDeals}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code Usage Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Uso del Código en el Tiempo</CardTitle>
          <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as "weekly" | "monthly")}>
            <TabsList>
              <TabsTrigger value="weekly">Semanal</TabsTrigger>
              <TabsTrigger value="monthly">Mensual</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(202 7% 82%)" />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="hsl(204 5% 31%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(204 5% 31%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 100%)",
                  border: "1px solid hsl(202 7% 82%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Area
                type="monotone"
                dataKey="uses"
                stroke="hsl(187 89% 27%)"
                fill="hsl(187 89% 27% / 0.15)"
                strokeWidth={2}
                name="Usos del código"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Projects by Referral */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Projects by Referral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Proyecto</th>
                  <th className="pb-3 font-medium">Categoría</th>
                  <th className="pb-3 font-medium text-right">Referidos</th>
                  <th className="pb-3 font-medium text-right">Comisiones</th>
                </tr>
              </thead>
              <tbody>
                {topProjectsByReferral.map((p, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 font-medium text-foreground">{p.project}</td>
                    <td className="py-3">
                      <Badge variant="secondary" className={categoryColors[p.category] || ""}>
                        {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 text-right text-foreground">{p.referrals}</td>
                    <td className="py-3 text-right font-medium text-foreground">${p.commissions.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Performing Opportunities by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topProjectsByReferral}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(202 7% 82%)" />
              <XAxis dataKey="project" tick={{ fontSize: 11 }} stroke="hsl(204 5% 31%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(204 5% 31%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 100%)",
                  border: "1px solid hsl(202 7% 82%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="commissions" fill="hsl(187 89% 27%)" radius={[4, 4, 0, 0]} name="Comisiones ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentAnalytics;
