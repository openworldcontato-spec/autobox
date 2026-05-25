import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, MapPin, Calendar, CreditCard, User, Shield, Star } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { cars } from "../data/cars";
import { formatCurrency } from "@/lib/formatters";

const steps = ["Dados", "Datas", "Extras", "Pagamento", "Confirmação"];

const extras = [
  { id: "gps", name: "GPS premium", price: 39, icon: "🗺️" },
  { id: "insurance", name: "Seguro completo", price: 149, icon: "🛡️" },
  { id: "driver", name: "Motorista profissional", price: 390, icon: "👨‍✈️" },
  { id: "baby", name: "Cadeirinha infantil", price: 35, icon: "👶" },
  { id: "wifi", name: "Wi‑Fi no carro", price: 29, icon: "📡" },
  { id: "delivery", name: "Entrega em hotel/aeroporto", price: 120, icon: "🏨" },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-10 overflow-x-auto scrollbar-hide pb-2">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1 min-w-[70px]">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i < current ? "bg-green-500 text-white" : i === current ? "bg-gold text-white shadow-lg shadow-yellow-500/30" : "bg-gray-100 text-gray-400"}`}>
              {i < current ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs mt-1.5 font-medium hidden sm:block ${i === current ? "text-gold" : i < current ? "text-green-500" : "text-gray-400"}`}>{label}</span>
          </div>
          {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${i < current ? "bg-green-500" : "bg-gray-100"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === Number(id));
  const [step, setStep] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [days, setDays] = useState(3);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", pickupDate: "", returnDate: "", deliveryAddress: "", cardNumber: "", expiry: "", cvv: "", name: "" });

  if (!car) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-xl text-gray-600">Carro não encontrado.</p>
        <Link to="/fleet" className="text-gold underline mt-2 block">Ver frota</Link>
      </div>
    </div>
  );

  const toggleExtra = (extraId) => setSelectedExtras(prev => prev.includes(extraId) ? prev.filter(e => e !== extraId) : [...prev, extraId]);
  const extrasTotal = extras.filter(e => selectedExtras.includes(e.id)).reduce((sum, e) => sum + e.price, 0);
  const carTotal = car.price * days;
  const grandTotal = carTotal + extrasTotal * days;

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-8 sm:p-10 text-center max-w-md w-full shadow-2xl">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Reserva confirmada!</h2>
          <p className="text-gray-500 mb-2">Seu {car.name} está reservado.</p>
          <div className="bg-gray-50 rounded-xl p-4 my-6 text-left">
            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Código</span><span className="font-bold text-gray-800">#BOX-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span></div>
            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Carro</span><span className="font-semibold text-gray-800">{car.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Total</span><span className="font-bold text-gold text-lg">{formatCurrency(grandTotal)}</span></div>
          </div>
          <div className="flex gap-3">
            <Link to="/bookings" className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl text-sm hover:bg-navy transition-colors">Minhas reservas</Link>
            <Link to="/" className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:border-gray-300 transition-colors">Início</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="mb-8">
          <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-1">Reservar carro</h1>
          <p className="text-gray-500 text-sm">Finalize sua reserva para o {car.name}</p>
        </div>

        <StepIndicator current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2"><User className="w-5 h-5 text-gold" />Dados pessoais</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "firstName", label: "Nome", placeholder: "João" },
                      { key: "lastName", label: "Sobrenome", placeholder: "Silva" },
                      { key: "email", label: "E-mail", placeholder: "joao@email.com", col: "sm:col-span-2" },
                      { key: "phone", label: "Telefone", placeholder: "+55 (11) 99999-9999", col: "sm:col-span-2", type: "tel" },
                    ].map(f => (
                      <div key={f.key} className={f.col || ""}>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor={f.key}>{f.label}</label>
                        <input id={f.key} type={f.type || "text"} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2"><Calendar className="w-5 h-5 text-gold" />Datas e local</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor="pickupDate">Data de retirada</label>
                      <input id="pickupDate" type="date" value={form.pickupDate} onChange={e => setForm(p => ({ ...p, pickupDate: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor="returnDate">Data de devolução</label>
                      <input id="returnDate" type="date" value={form.returnDate} onChange={e => setForm(p => ({ ...p, returnDate: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor="deliveryAddress">Endereço de entrega opcional</label>
                      <input id="deliveryAddress" type="text" value={form.deliveryAddress} onChange={e => setForm(p => ({ ...p, deliveryAddress: e.target.value }))} placeholder="Hotel, endereço ou aeroporto" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor="days">Duração do aluguel</label>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setDays(d => Math.max(1, d - 1))} className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-gold transition-colors cursor-pointer text-lg font-bold text-gray-600">-</button>
                        <span className="text-2xl font-bold text-gray-900 w-20 text-center">{days} dia{days > 1 ? "s" : ""}</span>
                        <button onClick={() => setDays(d => d + 1)} className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-gold transition-colors cursor-pointer text-lg font-bold text-gray-600">+</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2"><Shield className="w-5 h-5 text-gold" />Extras opcionais</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {extras.map(extra => {
                      const active = selectedExtras.includes(extra.id);
                      return (
                        <button key={extra.id} onClick={() => toggleExtra(extra.id)} className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer active:scale-[0.98] ${active ? "border-gold bg-yellow-50" : "border-gray-100 bg-white hover:border-gray-200"}`}>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3"><span className="text-2xl">{extra.icon}</span><span className="font-semibold text-gray-800 text-sm">{extra.name}</span></div>
                            <span className="text-gold font-bold text-sm">+{formatCurrency(extra.price)}/dia</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2"><CreditCard className="w-5 h-5 text-gold" />Pagamento</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                      Valores em BRL. Pix e cartão podem ser conectados depois no gateway de pagamento.
                    </div>
                    {[
                      { key: "cardNumber", label: "Número do cartão", placeholder: "0000 0000 0000 0000" },
                      { key: "name", label: "Nome impresso no cartão", placeholder: "JOAO SILVA" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor={f.key}>{f.label}</label>
                        <input id={f.key} type="text" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all" />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor="expiry">Validade</label>
                        <input id="expiry" type="text" value={form.expiry} onChange={e => setForm(p => ({ ...p, expiry: e.target.value }))} placeholder="MM/AA" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor="cvv">CVV</label>
                        <input id="cvv" type="text" value={form.cvv} onChange={e => setForm(p => ({ ...p, cvv: e.target.value }))} placeholder="123" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2"><Check className="w-5 h-5 text-gold" />Revise sua reserva</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <img src={car.image} alt={car.name} className="w-24 h-20 object-cover rounded-lg" />
                      <div><p className="font-bold text-gray-900">{car.name}</p><p className="text-sm text-gray-500">{car.location}</p><p className="text-gold font-bold mt-1">{formatCurrency(car.price)}/dia</p></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 mb-1">Dias</p><p className="font-bold text-gray-800">{days}</p></div>
                      <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 mb-1">Extras</p><p className="font-bold text-gray-800">{selectedExtras.length}</p></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer">
                <ChevronLeft className="w-4 h-4" /> Voltar
              </button>
              <button onClick={() => step === steps.length - 1 ? setConfirmed(true) : setStep(s => Math.min(steps.length - 1, s + 1))} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-white font-bold hover:bg-yellow-500 transition-colors cursor-pointer active:scale-[0.98]">
                {step === steps.length - 1 ? "Confirmar reserva" : "Continuar"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
              <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-xl mb-4" />
              <h3 className="font-playfair text-xl font-bold text-gray-900">{car.name}</h3>
              <div className="flex items-center gap-1 mt-1 mb-4 text-sm"><Star className="w-4 h-4 text-gold fill-gold" /><span className="font-semibold">{car.rating}</span><span className="text-gray-400">({car.reviews} avaliações)</span></div>
              <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between"><span className="text-gray-500">Diária</span><span className="font-semibold">{formatCurrency(car.price)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Dias</span><span className="font-semibold">{days}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold">{formatCurrency(carTotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Extras/dia</span><span className="font-semibold">{formatCurrency(extrasTotal)}</span></div>
                <div className="flex justify-between text-lg border-t border-gray-100 pt-3"><span className="font-bold text-gray-900">Total</span><span className="font-black text-gold">{formatCurrency(grandTotal)}</span></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 bg-green-50 rounded-xl p-3"><MapPin className="w-4 h-4 text-green-600" /> Atendimento disponível no Brasil com DDD +55.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
