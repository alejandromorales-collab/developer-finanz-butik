import { useState, useEffect } from "react";
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

function OnboardingCarousel({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const slide = onboardingSlides[step];
  const Icon = slide.icon;
  const isLast = step === onboardingSlides.length - 1;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-10 pb-8 px-8 space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Icon size={32} className="text-primary" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">{slide.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{slide.desc}</p>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            {onboardingSlides.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-primary" : "w-1.5 bg-border"}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={isLast ? onFinish : () => setStep(step + 1)} className="flex-1">
              {isLast ? "Comenzar" : "Siguiente"}
            </Button>
            {!isLast && (
              <Button variant="ghost" onClick={onFinish} className="text-muted-foreground">
                Omitir
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const AgentDashboard = () => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("agent_onboarded");
    if (!hasVisited) {
      setShowOnboarding(true);
      sessionStorage.setItem("agent_onboarded", "true");
    }
  }, []);

  if (showOnboarding) {
    return <OnboardingCarousel onFinish={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Hola, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Tu centro de comando de ventas y comisiones</p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-dashed border-primary/30 hover:border-primary/60 transition-colors">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <UserCircle size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-heading font-semibold text-foreground text-sm">Set up Agent Profile</p>
              <p className="text-xs text-muted-foreground">Completa tu perfil y acepta los términos de comisionamiento</p>
            </div>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/agent/profile"><ArrowRight size={16} /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-dashed border-primary/30 hover:border-primary/60 transition-colors">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Storefront size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-heading font-semibold text-foreground text-sm">Browse Opportunity Catalog</p>
              <p className="text-xs text-muted-foreground">Explora proyectos activos para compartir con tu red</p>
            </div>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/"><ArrowRight size={16} /></Link>
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
                      <span className="inline-flex items-center rounded-full border border-[hsl(var(--gold))] px-2 py-0.5 text-xs font-medium text-[hsl(var(--gold))]">
                        Pendiente
                      </span>
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
