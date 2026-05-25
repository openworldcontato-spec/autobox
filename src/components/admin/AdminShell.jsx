import { Link, useLocation } from "react-router-dom";
import { Building2, Car, ClipboardList, Gauge, Home, Package, Shield } from "lucide-react";
import Navbar from "../layout/Navbar";
import { getCompanies, getSelectedCompanyId, setSelectedCompanyId } from "@/lib/storage";
import { useEffect, useMemo, useState } from "react";

const menu = [
  { label: "Dashboard", href: "/admin", icon: Gauge, exact: true },
  { label: "Empresa", href: "/admin/empresa", icon: Building2 },
  { label: "Carros", href: "/admin/carros", icon: Car },
  { label: "Reservas", href: "/admin/reservas", icon: ClipboardList },
  { label: "Pacotes", href: "/admin/planos", icon: Package },
  { label: "Página pública", href: "/locadora/alpha-flex", icon: Home, publicLink: true },
  { label: "Super Admin", href: "/super-admin", icon: Shield },
];

export function StatusBadge({ label, className = "" }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-black ${className}`}>{label}</span>;
}

export function AdminShell({ children, title, subtitle, actions, activeCompanyId, onCompanyChange }) {
  const [companies, setCompanies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setCompanies(getCompanies());
  }, [location.pathname]);

  const selectedId = activeCompanyId || getSelectedCompanyId();
  const selectedCompany = useMemo(() => companies.find((company) => company.id === selectedId) || companies[0], [companies, selectedId]);
  const pageMenu = menu.map((item) => item.publicLink && selectedCompany ? { ...item, href: `/locadora/${selectedCompany.slug}` } : item);

  const handleChange = (event) => {
    setSelectedCompanyId(event.target.value);
    onCompanyChange?.(event.target.value);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="h-fit rounded-[2rem] border border-gray-100 bg-white p-4 shadow-sm lg:sticky lg:top-28">
          <div className="mb-4 rounded-2xl bg-gray-50 p-4">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-gray-400">Locadora ativa</p>
            <select value={selectedCompany?.id || ""} onChange={handleChange} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-800 outline-none focus:border-gold">
              {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
            </select>
          </div>
          <nav className="space-y-1">
            {pageMenu.map(({ label, href, icon: Icon, exact }) => {
              const active = exact ? location.pathname === href : location.pathname.startsWith(href);
              return (
                <Link key={label} to={href} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition-all active:scale-[0.98] ${active ? "bg-primary text-white shadow-lg shadow-navy/20" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                  <Icon className="h-4 w-4" /> {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-gold">Painel da locadora</p>
              <h1 className="mt-1 font-playfair text-4xl font-black text-gray-900">{title}</h1>
              {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function EmptyState({ icon: Icon = Car, title, text, action }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-gray-200 bg-white p-10 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 text-gold">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-black text-gray-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
