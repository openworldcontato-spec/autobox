import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PricingSection from "../components/home/PricingSection";
import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqData = [
  { q: "Posso cancelar minha assinatura quando quiser?", a: "Sim. Você pode cancelar a qualquer momento. O plano fica ativo até o fim do período já pago." },
  { q: "O seguro está incluso na diária?", a: "Sim. O seguro básico está incluso. Planos Elite e Prestige têm coberturas superiores e benefícios extras." },
  { q: "Como funciona a entrega do veículo?", a: "Você pode solicitar entrega em endereço, hotel ou aeroporto dentro da área atendida pela operação local." },
  { q: "O que acontece se houver dano no carro?", a: "A política depende do plano e do seguro escolhido. O app deixa isso claro antes da confirmação da reserva." },
  { q: "Posso trocar de plano depois?", a: "Sim. O usuário pode fazer upgrade ou downgrade conforme a regra comercial definida no painel." },
];

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer">
        <span className="font-semibold text-gray-800 text-sm pr-4">{q}</span>
        <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${open ? "text-gold" : "text-gray-300"}`} />
      </button>
      {open && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden"><p className="px-6 pb-4 text-gray-500 text-sm leading-relaxed">{a}</p></motion.div>}
    </div>
  );
}

const comparisonFeatures = [
  { feature: "Acesso à frota", explorer: "Padrão", elite: "Completa", prestige: "Ilimitado" },
  { feature: "Seguro", explorer: "Básico", elite: "Premium", prestige: "Sem franquia" },
  { feature: "Suporte", explorer: "Padrão", elite: "Prioritário", prestige: "Dedicado" },
  { feature: "Entrega do carro", explorer: false, elite: true, prestige: true },
  { feature: "Pontos de fidelidade", explorer: false, elite: true, prestige: true },
  { feature: "Cancelamento grátis", explorer: "48h antes", elite: "24h antes", prestige: "Flexível" },
  { feature: "Motorista opcional", explorer: false, elite: false, prestige: true },
  { feature: "Eventos exclusivos", explorer: false, elite: false, prestige: true },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="navy-gradient pt-32 pb-16 px-4 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">Preços simples</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
          Planos transparentes
        </motion.h1>
        <p className="text-gray-400 max-w-lg mx-auto">Sem taxa escondida, valores em BRL e upgrade quando fizer sentido para o cliente.</p>
      </div>

      <PricingSection />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-10">Comparativo completo</h2>
          <div className="rounded-2xl border border-gray-100 overflow-x-auto shadow-sm">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="navy-gradient text-white">
                  <th className="text-left py-4 px-6 font-semibold text-sm">Recurso</th>
                  <th className="py-4 px-4 font-semibold text-sm text-center">Explorador</th>
                  <th className="py-4 px-4 font-semibold text-sm text-center bg-gold/20">Elite</th>
                  <th className="py-4 px-4 font-semibold text-sm text-center">Prestige</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-3.5 px-6 text-sm font-medium text-gray-700">{row.feature}</td>
                    {["explorer", "elite", "prestige"].map((plan) => (
                      <td key={plan} className={`py-3.5 px-4 text-center text-sm ${plan === "elite" ? "bg-yellow-50/50" : ""}`}>
                        {row[plan] === true ? <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full"><Check className="w-3.5 h-3.5 text-green-600" /></span> : row[plan] === false ? <span className="text-gray-300 text-lg">—</span> : <span className="text-gray-600 font-medium">{row[plan]}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-10">Perguntas frequentes</h2>
          <div className="space-y-3">{faqData.map(item => <FAQ key={item.q} {...item} />)}</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
