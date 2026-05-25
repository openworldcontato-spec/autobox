import { Link, useLocation } from "react-router-dom";
import { Home, Car, CalendarDays, Crown } from "lucide-react";

const items = [
  { label: "Início", href: "/", icon: Home, match: (path) => path === "/" },
  { label: "Frota", href: "/fleet", icon: Car, match: (path) => path.startsWith("/fleet") || path.startsWith("/car") },
  { label: "Reservas", href: "/bookings", icon: CalendarDays, match: (path) => path.startsWith("/bookings") || path.startsWith("/booking") },
  { label: "Planos", href: "/pricing", icon: Crown, match: (path) => path.startsWith("/pricing") },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_40px_rgba(15,23,42,0.10)]" aria-label="Navegação principal do app">
      <div className="grid grid-cols-4 h-[68px] px-2">
        {items.map(({ label, href, icon: Icon, match }) => {
          const active = match(location.pathname);
          return (
            <Link
              key={label}
              to={href}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-bold transition-all active:scale-95 ${active ? "text-gold" : "text-gray-500"}`}
            >
              <div className={`w-10 h-8 flex items-center justify-center rounded-2xl ${active ? "bg-yellow-50" : "bg-transparent"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
