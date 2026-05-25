import { Link, useLocation } from "react-router-dom";
import { Building2, Car, Home, LayoutDashboard, Shield } from "lucide-react";

const items = [
  { label: "Início", href: "/", icon: Home, match: (path) => path === "/" },
  { label: "Cadastro", href: "/cadastro-empresa", icon: Building2, match: (path) => path.startsWith("/cadastro") },
  { label: "Painel", href: "/admin", icon: LayoutDashboard, match: (path) => path.startsWith("/admin") },
  { label: "Carros", href: "/admin/carros", icon: Car, match: (path) => path.includes("carros") || path.includes("frota") },
  { label: "Master", href: "/super-admin", icon: Shield, match: (path) => path.startsWith("/super-admin") },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:hidden" aria-label="Navegação principal mobile">
      <div className="grid h-[72px] grid-cols-5 px-1">
        {items.map(({ label, href, icon: Icon, match }) => {
          const active = match(location.pathname);
          return (
            <Link key={href} to={href} className={`flex flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-black transition-all active:scale-95 ${active ? "text-gold" : "text-gray-500"}`}>
              <span className={`flex h-8 w-10 items-center justify-center rounded-2xl ${active ? "bg-yellow-50" : "bg-transparent"}`}>
                <Icon className="h-5 w-5" />
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
