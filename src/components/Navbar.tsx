import { Bell, Question, User, CaretDown, SignIn, SignOut } from "@phosphor-icons/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Invest", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Learn", href: "/learn" },
];

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-sm font-bold text-primary-foreground">FB</span>
          </div>
          <span className="font-heading text-lg font-bold text-foreground">
            Finanz Butik<sup className="text-[10px] text-muted-foreground">®</sup>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
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
          {isAuthenticated && user?.role === "developer" && (
            <Link
              to="/developer"
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                location.pathname.startsWith("/developer")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Dashboard
            </Link>
          )}
          {isAuthenticated && user?.role === "manager" && (
            <Link
              to="/manager"
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                location.pathname.startsWith("/manager")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Manager
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground">
            <Question size={20} />
          </button>
          <button className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground">
            <Bell size={20} />
          </button>
          {isAuthenticated ? (
            <>
              <span className="hidden text-xs text-muted-foreground sm:block">{user?.name}</span>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
                title="Logout"
              >
                <SignOut size={20} />
              </button>
            </>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/login"><SignIn size={16} className="mr-1" /> Login</Link>
            </Button>
          )}
          <button className="flex items-center gap-1 text-sm text-muted-foreground">
            EN <CaretDown size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
