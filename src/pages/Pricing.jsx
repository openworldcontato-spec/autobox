import { Link } from "react-router-dom";
import { Check, CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { formatCurrency } from "@/lib/formatters";

const items = [
  "Página pública individual da locadora",
  "Cadastro e edição ilimitada de carros",
  "Gestão de reservas com status",
  "Upload de logo, contato e identidade da empresa",
  "Pacotes próprios: diária, semanal, mensal, km livre e motorista",
  "Dashboard operacional da locadora",
  "Super Admin para controlar clientes do SaaS",
  "Layout responsivo para web, Android e iOS",
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-sm font-black text-gold">
              <Sparkles className="h-4 w-4" /> Plano comercial do SaaS
            </div>
            <h1 className="font-playfair text-4xl font-black text-gray-900 sm:text-6xl">AutoBox Pro</h1>
            <p className="mx-auto mt-4 max-w-2xl text-gray-500">Plano único para empresas que alugam carros. A cobrança real você liga na Stripe/Base44 depois, sem mudar a lógica das telas.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] navy-gradient p-8 text-white shadow-2xl">
              <p className="text-sm font-black uppercase tracking-widest text-gold">Plano único</p>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-6xl font-black">{formatCurrency(97)}</span>
                <span className="pb-2 text-white/50">/mês</span>
              </div>
              <p className="mt-4 text-white/65">Cobrado da locadora que usa o sistema, não do cliente final que reserva o carro.</p>
              <Link to="/cadastro-empresa" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-4 text-sm font-black text-white shadow-lg shadow-yellow-500/30 hover:bg-yellow-500">
                Criar ambiente da locadora <CreditCard className="h-4 w-4" />
              </Link>
              <Link to="/admin" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white hover:bg-white/15">
                Abrir painel demo <ShieldCheck className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900">O que entra no plano</h2>
              <p className="mt-2 text-sm text-gray-500">Escopo fechado, fácil de vender e sem confundir com diária dos veículos.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-gray-50 p-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
                <p className="font-black text-yellow-900">Regra do jogo</p>
                <p className="mt-1 text-sm text-yellow-800">O plano AutoBox Pro é seu SaaS. Os valores de diária, semanal, mensal e caução são cadastrados pela própria locadora no painel dela.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
