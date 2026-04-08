import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const navLinks = [
  { label: "Fleet", href: "/fleet" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled || !isHome
    ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
    : "bg-transparent";

  const textColor = scrolled || !isHome ? "text-gray-900" : "text-white";
  const logoColor = scrolled || !isHome ? "text-navy" : "text-white";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">D</span>
              </div>
              <span className={`font-playfair font-bold text-xl ${logoColor} transition-colors duration-300`}>
                Drive<span className="text-gradient">Elite</span>
              </span>
            </Link>

            {/* Desktop Nav */}
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

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+18005551234" className={`flex items-center gap-1.5 text-sm ${textColor} opacity-70 hover:opacity-100 transition-opacity`}>
                <Phone className="w-3.5 h-3.5" />
                +1 800 555 1234
              </a>
              <Link
                to="/fleet"
                className="bg-gold hover:bg-yellow-500 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-yellow-500/20"
              >
                Browse Fleet
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg ${textColor}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-[25] bg-white border-b border-gray-100 shadow-xl lg:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-800 font-medium py-2 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/fleet"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-gold text-white font-semibold py-3 rounded-full mt-4"
              >
                Browse Fleet
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}