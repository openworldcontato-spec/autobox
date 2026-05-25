import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl gold-gradient">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-playfair text-2xl font-black">Auto<span className="text-gradient">Box</span></p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">SaaS para locadoras</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/60">
              Plataforma para locadoras gerenciarem frota, reservas, página pública, contatos e regras da operação. Você vende o sistema; a locadora vende as diárias.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-white/50">Produto</p>
            <div className="space-y-2 text-sm text-white/70">
              <Link to="/planos" className="block hover:text-gold">Plano R$97/mês</Link>
              <Link to="/cadastro-empresa" className="block hover:text-gold">Cadastrar locadora</Link>
              <Link to="/locadora/alpha-flex" className="block hover:text-gold">Página pública exemplo</Link>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-white/50">Gestão</p>
            <div className="space-y-2 text-sm text-white/70">
              <Link to="/admin" className="block hover:text-gold">Painel da locadora</Link>
              <Link to="/admin/carros" className="block hover:text-gold">Carros</Link>
              <Link to="/admin/reservas" className="block hover:text-gold">Reservas</Link>
              <Link to="/super-admin" className="block hover:text-gold">Super Admin</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">© 2026 AutoBox. Produto SaaS multiempresa para o mercado brasileiro.</div>
      </div>
    </footer>
  );
}
