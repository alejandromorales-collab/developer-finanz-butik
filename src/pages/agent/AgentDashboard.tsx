import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCircle, Storefront, CurrencyDollar, Users, ClockCounterClockwise, ArrowRight, Sparkle, Rocket, Target } from "@phosphor-icons/react";
import { agentStats, pendingAttributions } from "@/data/mockAgent";
import { useAuth } from "@/contexts/AuthContext";

const onboardingSlides = [
  { icon: Sparkle, title: "Bienvenido al Agent Portal", desc: "Tu centro de comando para distribuir oportunidades de inversión y ganar comisiones." },
  { icon: Rocket, title: "Comparte tu código único", desc: "Cada inversor que se registra con tu código queda vinculado a ti automáticamente." },
  { icon: Target, title: "Monitorea tus resultados", desc: "Visualiza tu embudo, comisiones acumuladas y rendimiento por proyecto en tiempo real." },
];

const AgentDashboard = () => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Hola, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Tu centro de comando de ventas y comisiones</p>
      </div>

      {/* Onboarding Carousel */}
      {showOnboarding && (
        <Card className="border-primary/20 bg-[hsl(var(--sentiment-info))]">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {(() => {
                const Icon = onboardingSlides[slideIndex].icon;
                return <Icon size={32} className="text-primary shrink-0 mt-1" />;
              })()}
              <div className="flex-1">
                <h3 className="font-heading font-bold text-foreground">{onboardingSlides[slideIndex].title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{onboardingSlides[slideIndex].desc}</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex gap-1.5">
                    {onboardingSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${i === slideIndex ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
                      />
                    ))}
                  </div>
                  <div className="ml-auto flex gap-2">
                    {slideIndex < onboardingSlides.length - 1 ? (
                      <Button size="sm" onClick={() => setSlideIndex(slideIndex + 1)}>
                        Siguiente <ArrowRight size={14} className="ml-1" />
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => setShowOnboarding(false)}>
                        Comenzar
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => setShowOnboarding(false)}>
                      Omitir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <UserCircle size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground">Set up Agent Profile</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Completa tu perfil y acepta los términos de comisionamiento</p>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link to="/agent/profile">Configurar</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Storefront size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground">Browse Opportunity Catalog</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Explora proyectos activos para compartir con tu red</p>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link to="/">Explorar</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Data Points */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CurrencyDollar size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Comisiones Ganadas</p>
                <p className="text-xl font-bold font-heading text-foreground">
                  ${agentStats.totalCommissions.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Código Redimido</p>
                <p className="text-xl font-bold font-heading text-foreground">
                  {agentStats.codeRedemptions}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--success))]/10">
                <Target size={20} className="text-[hsl(var(--success))]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Deals Cerrados</p>
                <p className="text-xl font-bold font-heading text-foreground">
                  {agentStats.closedDeals}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--gold))]/10">
                <ClockCounterClockwise size={20} className="text-[hsl(var(--gold))]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Atribuciones Pendientes</p>
                <p className="text-xl font-bold font-heading text-foreground">
                  {agentStats.pendingAttributions}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Attributions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Atribuciones Pendientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Inversor</th>
                  <th className="pb-3 font-medium">Proyecto</th>
                  <th className="pb-3 font-medium text-right">Monto</th>
                  <th className="pb-3 font-medium">Fecha</th>
                  <th className="pb-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {pendingAttributions.map((attr) => (
                  <tr key={attr.id} className="border-b last:border-0">
                    <td className="py-3 font-medium text-foreground">{attr.investorName}</td>
                    <td className="py-3 text-muted-foreground">{attr.project}</td>
                    <td className="py-3 text-right font-medium text-foreground">${attr.amount.toLocaleString()}</td>
                    <td className="py-3 text-muted-foreground">{attr.date}</td>
                    <td className="py-3">
                      <Badge variant="outline" className="border-[hsl(var(--gold))] text-[hsl(var(--gold))]">
                        Pendiente
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;
