import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check, DownloadSimple, Warning, WhatsappLogo, EnvelopeSimple, IdentificationBadge, ShieldCheck } from "@phosphor-icons/react";
import { agentProfile, mediaKitItems } from "@/data/mockAgent";
import { useToast } from "@/hooks/use-toast";

const AgentProfileSetup = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: agentProfile.name,
    company: agentProfile.company,
    bio: agentProfile.bio,
    tcAccepted: agentProfile.tcAccepted,
  });

  const copyCode = () => {
    navigator.clipboard.writeText(agentProfile.agentCode);
    setCopied(true);
    toast({ title: "Código copiado", description: `${agentProfile.agentCode} copiado al portapapeles` });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Profile & Agent Assets</h1>
        <p className="text-sm text-muted-foreground mt-1">Gestiona tu identidad, código único y materiales de marca</p>
      </div>

      {/* Agent Code Card */}
      <Card className="border-primary/30">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <IdentificationBadge size={28} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Tu Código Único de Agente</p>
              <p className="text-2xl font-heading font-bold text-foreground mt-1 tracking-wide">{agentProfile.agentCode}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={copyCode}>
                {copied ? <Check size={16} className="mr-1" /> : <Copy size={16} className="mr-1" />}
                {copied ? "Copiado" : "Copy Code"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => {
                window.open(`https://wa.me/?text=Invierte con Finanz Butik usando mi código: ${agentProfile.agentCode}`, "_blank");
              }}>
                <WhatsappLogo size={16} className="mr-1" /> WhatsApp
              </Button>
              <Button size="sm" variant="outline" onClick={() => {
                window.open(`mailto:?subject=Invierte con Finanz Butik&body=Usa mi código: ${agentProfile.agentCode}`, "_blank");
              }}>
                <EnvelopeSimple size={16} className="mr-1" /> Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Perfil del Agente</CardTitle>
            <CardDescription>Información visible para el equipo de Finanz Butik</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Profile Photo — first */}
            <div className="space-y-2">
              <Label>Foto de Perfil</Label>
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xl font-bold font-heading">
                  {form.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <Button size="sm" variant="outline">Cambiar foto</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo o Entidad Legal</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio Profesional</Label>
              <textarea
                id="bio"
                rows={3}
                className="flex w-full rounded-lg border border-input bg-[hsl(var(--surface-input))] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="tc"
                checked={form.tcAccepted}
                onCheckedChange={(checked) => setForm({ ...form, tcAccepted: !!checked })}
              />
              <Label htmlFor="tc" className="text-xs text-muted-foreground leading-snug cursor-pointer">
                Acepto los Términos y Condiciones del programa de comisionamiento de Finanz Butik®
              </Label>
            </div>
            <Button className="w-full mt-2" disabled={!form.tcAccepted}>
              <ShieldCheck size={16} className="mr-1" /> Guardar Perfil
            </Button>
          </CardContent>
        </Card>

        {/* Media Kit */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Media Kit</CardTitle>
              <CardDescription>Materiales de marca con tu código embebido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mediaKitItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.type.toUpperCase()} · {item.size}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <DownloadSimple size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deactivate Account */}
          <Card className="border-destructive/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Warning size={24} className="text-destructive shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground">Desactivar Cuenta</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Esta acción deshabilitará tu código de agente y detendrá la acumulación de comisiones. Los deals pendientes no se verán afectados.
                  </p>
                  <Button size="sm" variant="destructive" className="mt-3">
                    Desactivar Cuenta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentProfileSetup;
