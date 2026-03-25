import { useState } from "react";
import { Bell, Question, CaretDown, SignIn, SignOut, List, X } from "@phosphor-icons/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const authNavItems = [
  { label: "Invest", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Learn", href: "/learn" },
];

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardRoles = ["developer", "vendor", "agent"] as const;
  const showDashboard = isAuthenticated && user && dashboardRoles.includes(user.role as any);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-14 items-center justify-between md:h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-sm font-bold text-primary-foreground">FB</span>
          </div>
          <span className="font-heading text-lg font-bold text-foreground">
            Finanz Butik<sup className="text-[10px] text-muted-foreground">®</sup>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {isAuthenticated && authNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          {showDashboard && (
            <Link
              to={`/${user!.role}`}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                location.pathname.startsWith(`/${user!.role}`)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {isAuthenticated && (
            <>
              <button className="hidden rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground sm:block">
                <Question size={20} />
              </button>
              <button className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground">
                <Bell size={20} />
              </button>
            </>
          )}
          {isAuthenticated ? (
            <>
              <span className="hidden text-xs text-muted-foreground lg:block">{user?.name}</span>
              <button
                onClick={() => { logout(); navigate("/"); setMobileOpen(false); }}
                className="hidden rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground md:block"
                title="Logout"
              >
                <SignOut size={20} />
              </button>
            </>
          ) : (
            <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
              <Link to="/login"><SignIn size={16} className="mr-1" /> Login</Link>
            </Button>
          )}
          <button className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            EN <CaretDown size={14} />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-2 text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-background px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {isAuthenticated && authNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            {showDashboard && (
              <Link
                to={`/${user!.role}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  location.pathname.startsWith(`/${user!.role}`)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                Dashboard
              </Link>
            )}
          </nav>
          <div className="mt-3 border-t pt-3">
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); navigate("/"); setMobileOpen(false); }}
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
              >
                <SignOut size={18} /> Cerrar sesión
              </button>
            ) : (
              <Button variant="default" size="sm" className="w-full" asChild>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <SignIn size={16} className="mr-1" /> Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
