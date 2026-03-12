import { useNavigate } from "react-router-dom";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User, Buildings, Briefcase, Megaphone } from "@phosphor-icons/react";

const roles: { role: UserRole; label: string; desc: string; icon: typeof User; path: string }[] = [
  { role: "investor", label: "Inversor", desc: "Explora oportunidades y gestiona tu portafolio", icon: User, path: "/" },
  { role: "developer", label: "Developer", desc: "Publica proyectos, gestiona clientes y personaliza la marca", icon: Buildings, path: "/developer" },
  { role: "vendor", label: "Vendor", desc: "Ofrece servicios profesionales, gestiona credenciales y monitorea tus ingresos", icon: Briefcase, path: "/vendor" },
  { role: "agent", label: "Agent / Reseller", desc: "Distribuye oportunidades, monitorea tu embudo de ventas y gestiona tus comisiones acumuladas", icon: Megaphone, path: "/agent" },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole, path: string) => {
    login(role);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <span className="text-lg font-bold text-primary-foreground">FB</span>
          </div>
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">
            Finanz Butik<sup className="text-xs text-muted-foreground">®</sup>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Selecciona un rol para continuar (mock)</p>
        </div>

        <div className="space-y-3">
          {roles.map(({ role, label, desc, icon: Icon, path }) => (
            <button
              key={role}
              onClick={() => handleLogin(role, path)}
              className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon size={22} className="text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
