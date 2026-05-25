import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Car, CheckCircle2, CreditCard, LayoutDashboard, MessageCircle, ShieldCheck, Sparkles, Users } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { formatCurrency } from "@/lib/formatters";

const features = [
  { icon: Building2, title: "White-label por locadora", text: "Cada empresa tem nome, logo, contato, página pública e regras próprias." },
  { icon: Car, title: "Gestão completa da frota", text: "Adicione, edite, exclua, ative e altere o status dos veículos pelo painel." },
  { icon: LayoutDashboard, title: "Painel operacional", text: "Reservas, indicadores, pacotes de aluguel e dados da empresa em um único painel." },
  { icon: ShieldCheck, title: "Multiempresa", text: "Dados separados por empresa, evitando que uma locadora acesse informações de outra." },
];

const flows = [
  "Locadora assina o AutoBox Pro por R$97/mês.",
  "Ela cadastra frota, valores, logo, WhatsApp e regras.",
  "Cliente final acessa a página pública da locadora e solicita reserva.",
  "A locadora aprova, cancela ou conclui reservas pelo painel.",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="navy-gradient relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-gold backdrop-blur">
              <Sparkles className="h-4 w-4" /> SaaS brasileiro para locadoras
            </div>
            <h1 className="font-playfair text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
              Sistema completo para locadoras de veículos.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              AutoBox é uma plataforma multiempresa para locadoras: cada empresa gerencia frota, reservas, logo, contato, página pública e pacotes próprios. Plano único: {formatCurrency(97)}/mês.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/cadastro-empresa" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-7 py-4 text-sm font-black text-white shadow-2xl shadow-yellow-500/30 transition-all hover:bg-yellow-500 active:scale-[0.98]">
                Criar ambiente da locadora <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/admin" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition-all hover:bg-white/15 active:scale-[0.98]">
                Abrir painel de exemplo
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} className="rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-5 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">Painel da locadora</p>
                  <h2 className="text-2xl font-black text-gray-900">Alpha Flex</h2>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">Ativa</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Carros", "3", Car],
                  ["Reservas", "2", Users],
                  ["Receita", "R$ 960", CreditCard],
                  ["WhatsApp", "+55", MessageCircle],
                ].map(([label, value, Icon]) => (
                  <div key={label} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <Icon className="mb-3 h-5 w-5 text-gold" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
                    <p className="text-xl font-black text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-gray-100 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-black text-gray-900">Jeep Compass</p>
                  <span className="rounded-full bg-orange-50 px-2 py-1 text-[10px] font-black text-orange-700">Manutenção</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div className="h-2 w-2/3 rounded-full bg-gold" />
                </div>
                <p className="mt-3 text-sm text-gray-500">Status, diária, caução e descrição editáveis pela locadora.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-widest text-gold">Plataforma para locadoras</p>
          <h2 className="mt-2 font-playfair text-4xl font-black text-gray-900">Uma plataforma SaaS para locadoras venderem mais.</h2>
          <p className="mt-4 text-gray-500">O AutoBox organiza a operação da locadora: frota, preços, reservas, contato, identidade visual e página pública em um só lugar.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, index) => (
            <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-gold">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-gray-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-500">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-gold">Fluxo operacional</p>
            <h2 className="mt-2 font-playfair text-4xl font-black text-gray-900">Do cadastro à reserva, tudo organizado.</h2>
            <p className="mt-4 text-gray-500">O app já vem com rotas, telas e botões funcionando com persistência local. Depois, a integração com Stripe/Base44 pode ser conectada ao fluxo existente.</p>
            <Link to="/locadora/alpha-flex" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-black text-white hover:bg-navy">
              Ver página pública exemplo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {flows.map((flow, index) => (
              <div key={flow} className="flex gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold text-sm font-black text-white">{index + 1}</div>
                <div>
                  <p className="font-bold text-gray-900">{flow}</p>
                  <p className="mt-1 text-sm text-gray-500">Etapa funcional, com navegação e salvamento local para validação do fluxo.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] navy-gradient p-8 text-center shadow-2xl sm:p-12">
          <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-gold" />
          <h2 className="font-playfair text-4xl font-black text-white">Plano único AutoBox Pro</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">{formatCurrency(97)}/mês para a locadora usar o sistema. A integração de pagamento pode ser configurada na Base44/Stripe sem alterar a lógica principal do produto.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/planos" className="rounded-2xl bg-white px-7 py-4 text-sm font-black text-navy">Ver plano</Link>
            <Link to="/cadastro-empresa" className="rounded-2xl bg-gold px-7 py-4 text-sm font-black text-white">Cadastrar locadora</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
