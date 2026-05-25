import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Menu, ShieldCheck, X } from "lucide-react";

const navLinks = [
  { label: "Produto", href: "/" },
  { label: "Plano R$97", href: "/planos" },
  { label: "Cadastrar locadora", href: "/cadastro-empresa" },
  { label: "Painel", href: "/admin" },
  { label: "Super Admin", href: "/super-admin" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const solid = scrolled || !isHome;

  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-all ${solid ? "bg-white/95 shadow-sm backdrop-blur-xl border-b border-gray-100" : "bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link to="/" className="flex items-center gap-2" aria-label="AutoBox - início">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl gold-gradient shadow-lg shadow-yellow-500/25">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className={`block font-playfair text-xl font-black ${solid ? "text-navy" : "text-white"}`}>Auto<span className="text-gradient">Box</span></span>
              <span className={`hidden text-[10px] font-bold uppercase tracking-[0.2em] sm:block ${solid ? "text-gray-400" : "text-white/60"}`}>SaaS para locadoras</span>
            </div>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className={`text-sm font-bold transition-colors hover:text-gold ${solid ? "text-gray-700" : "text-white/85"}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/locadora/alpha-flex" className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${solid ? "border border-gray-200 text-gray-700 hover:border-gold" : "glass text-white"}`}>
              Ver exemplo
            </Link>
            <Link to="/cadastro-empresa" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-yellow-500/25 transition-all hover:bg-yellow-500 active:scale-[0.98]">
              <ShieldCheck className="h-4 w-4" /> Começar
            </Link>
          </div>

          <button onClick={() => setMobileOpen((value) => !value)} className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all active:scale-95 lg:hidden ${solid ? "text-gray-900" : "text-white"}`} aria-label="Abrir menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="fixed inset-x-0 top-[calc(4rem+env(safe-area-inset-top))] z-50 border-b border-gray-100 bg-white p-4 shadow-2xl lg:hidden">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className="block rounded-2xl px-4 py-3 text-sm font-black text-gray-800 active:bg-gray-100">
                  {link.label}
                </Link>
              ))}
              <Link to="/locadora/alpha-flex" className="block rounded-2xl px-4 py-3 text-sm font-black text-gray-800 active:bg-gray-100">Ver exemplo público</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
