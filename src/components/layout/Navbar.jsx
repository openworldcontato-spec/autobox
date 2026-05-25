import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/formatters";

const navLinks = [
  { label: "Frota", href: "/fleet" },
  { label: "Como funciona", href: "/#how-it-works" },
  { label: "Planos", href: "/pricing" },
  { label: "Reservas", href: "/bookings" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navBg = scrolled || !isHome
    ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
    : "bg-transparent";

  const textColor = scrolled || !isHome ? "text-gray-900" : "text-white";
  const logoColor = scrolled || !isHome ? "text-navy" : "text-white";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 pt-[env(safe-area-inset-top)] ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2" aria-label="AutoBox - início">
              <div className="w-9 h-9 gold-gradient rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <span className="text-white font-black text-sm">A</span>
              </div>
              <span className={`font-playfair font-bold text-xl ${logoColor} transition-colors duration-300`}>
                Auto<span className="text-gradient">Box</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-gold ${textColor}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a href={`tel:${PHONE_TEL}`} className={`flex items-center gap-1.5 text-sm ${textColor} opacity-70 hover:opacity-100 transition-opacity`}>
                <Phone className="w-3.5 h-3.5" />
                {PHONE_DISPLAY}
              </a>
              <Link
                to="/fleet"
                className="bg-gold hover:bg-yellow-500 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-yellow-500/20"
              >
                Ver frota
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-xl ${textColor} active:scale-95 transition-transform`}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[calc(4rem+env(safe-area-inset-top))] z-[35] bg-white border-b border-gray-100 shadow-xl lg:hidden"
          >
            <div className="px-4 py-5 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-gray-800 font-semibold py-3 px-3 rounded-xl active:bg-gray-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-2 text-gray-700 font-semibold py-3 px-3 rounded-xl active:bg-gray-100"
              >
                <Phone className="w-4 h-4 text-gold" /> {PHONE_DISPLAY}
              </a>
              <Link
                to="/fleet"
                className="block w-full text-center bg-gold text-white font-bold py-3.5 rounded-2xl mt-3 active:scale-[0.98] transition-transform"
              >
                Alugar agora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
