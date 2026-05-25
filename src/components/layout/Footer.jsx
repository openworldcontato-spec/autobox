import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/formatters";

export default function Footer() {
  return (
    <footer className="navy-gradient text-white pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 gold-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-black">A</span>
              </div>
              <span className="font-playfair font-bold text-xl">
                Auto<span className="text-gradient">Box</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Plataforma brasileira para aluguel de carros premium, esportivos e executivos. Tudo em reais, atendimento local e navegação pronta para web, Android e iOS.
            </p>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-gold mb-5">
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <button key={i} className="w-9 h-9 glass rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors cursor-pointer" aria-label="Rede social">
                  <Icon className="w-4 h-4 text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Frota</h4>
            <ul className="space-y-2.5">
              {["Supercarros", "Sedãs de luxo", "Esportivos", "Elétricos", "SUVs"].map(item => (
                <li key={item}>
                  <Link to="/fleet" className="text-gray-400 hover:text-gold text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-2.5">
              {["Sobre", "Como funciona", "Planos", "Blog", "Carreiras", "Contato"].map(item => (
                <li key={item}>
                  <Link to="/" className="text-gray-400 hover:text-gold text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Receba novidades</h4>
            <p className="text-gray-400 text-sm mb-4">Promoções, novos veículos e ofertas direto no seu e-mail.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-full focus:outline-none focus:border-gold/50 focus:bg-white/15 transition-all"
              />
              <button className="w-11 h-11 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity cursor-pointer" aria-label="Assinar novidades">
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">© 2026 AutoBox. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center gap-5">
            {["Política de Privacidade", "Termos de Uso", "Política de Cookies"].map(item => (
              <Link key={item} to="/" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
