import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, Car, CheckCircle2, Fuel, Mail, MapPin, MessageCircle, Send, Users } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { createReservation, getCarsByCompany, getCompanyBySlug, STATUSES, statusStyles } from "@/lib/storage";
import { formatCurrency } from "@/lib/formatters";

const inputClass = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-yellow-100";
const labelClass = "mb-1.5 block text-xs font-black uppercase tracking-widest text-gray-400";

const daysBetween = (start, end) => {
  if (!start || !end) return 1;
  const diff = (new Date(`${end}T12:00:00`) - new Date(`${start}T12:00:00`)) / (1000 * 60 * 60 * 24);
  return Math.max(1, Math.ceil(diff));
};

function ReservationForm({ company, car, onClose, onDone }) {
  const [form, setForm] = useState({ customerName: "", phone: "+55 ", email: "", pickupDate: "", returnDate: "", notes: "" });
  const days = daysBetween(form.pickupDate, form.returnDate);
  const total = Number(car.dailyPrice || 0) * days;
  const change = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    createReservation({ ...form, companyId: company.id, carId: car.id, days, total });
    onDone();
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-navy/70 p-4 backdrop-blur-sm">
      <div className="mx-auto my-8 max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gold">Solicitar reserva</p>
            <h2 className="text-2xl font-black text-gray-900">{car.name}</h2>
            <p className="text-sm text-gray-500">{formatCurrency(car.dailyPrice)}/dia • Total estimado: <strong>{formatCurrency(total)}</strong></p>
          </div>
          <button onClick={onClose} className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-black text-gray-600 hover:bg-gray-50">Fechar</button>
        </div>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Nome completo</label>
            <input className={inputClass} value={form.customerName} onChange={(e) => change("customerName", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>WhatsApp +55</label>
            <input className={inputClass} value={form.phone} onChange={(e) => change("phone", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>E-mail</label>
            <input type="email" className={inputClass} value={form.email} onChange={(e) => change("email", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Retirada</label>
            <input type="date" className={inputClass} value={form.pickupDate} onChange={(e) => change("pickupDate", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Devolução</label>
            <input type="date" className={inputClass} value={form.returnDate} onChange={(e) => change("returnDate", e.target.value)} required />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Observações</label>
            <textarea rows="3" className={inputClass} value={form.notes} onChange={(e) => change("notes", e.target.value)} placeholder="Local de retirada, dúvidas, necessidade de motorista..." />
          </div>
          <div className="sm:col-span-2 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
            A solicitação entra como <strong>pendente</strong> no painel da locadora. A empresa confirma pelo WhatsApp. Sem pagamento fake aqui.
          </div>
          <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-4 text-sm font-black text-white hover:bg-yellow-500"><Send className="h-4 w-4" /> Enviar solicitação</button>
        </form>
      </div>
    </div>
  );
}

export default function PublicCompany() {
  const { slug } = useParams();
  const company = getCompanyBySlug(slug);
  const [selectedCar, setSelectedCar] = useState(null);
  const [done, setDone] = useState(false);
  const [category, setCategory] = useState("all");

  const cars = company ? getCarsByCompany(company.id) : [];
  const categories = useMemo(() => ["all", ...new Set(cars.map((car) => car.category))], [cars]);
  const filtered = category === "all" ? cars : cars.filter((car) => car.category === category);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 pt-32 text-center">
          <h1 className="font-playfair text-4xl font-black text-gray-900">Locadora não encontrada</h1>
          <p className="mt-3 text-gray-500">Esse slug não existe ou a empresa foi removida.</p>
          <Link to="/" className="mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 text-sm font-black text-white">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="navy-gradient px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[2rem] bg-white text-2xl font-black text-navy">
                {company.logoDataUrl ? <img src={company.logoDataUrl} alt={company.name} className="h-full w-full object-cover" /> : company.logo}
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-gold">Página pública da locadora</p>
                <h1 className="font-playfair text-4xl font-black text-white sm:text-5xl">{company.name}</h1>
              </div>
            </div>
            <p className="max-w-2xl text-xl font-bold text-white">{company.publicHeadline}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">{company.howItWorks}</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 text-white backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4"><MapPin className="mb-2 h-5 w-5 text-gold" /><p className="text-sm font-bold">{company.address || "Endereço não informado"}</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><MessageCircle className="mb-2 h-5 w-5 text-gold" /><p className="text-sm font-bold">{company.whatsapp}</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><Mail className="mb-2 h-5 w-5 text-gold" /><p className="text-sm font-bold">{company.email}</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><CalendarDays className="mb-2 h-5 w-5 text-gold" /><p className="text-sm font-bold">{company.contactText}</p></div>
            </div>
          </div>
        </div>
      </section>

      {done && (
        <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-green-200 bg-green-50 p-5 text-green-800">
            <div className="flex items-center gap-3"><CheckCircle2 className="h-6 w-6" /><p className="font-black">Reserva enviada para o painel da locadora.</p></div>
            <p className="mt-1 text-sm">Agora ela aparece em Admin &gt; Reservas como pendente.</p>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-gold">Frota disponível</p>
            <h2 className="font-playfair text-4xl font-black text-gray-900">Escolha um veículo</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-black ${category === item ? "bg-primary text-white" : "border border-gray-200 bg-white text-gray-700"}`}>{item === "all" ? "Todos" : item}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((car) => (
            <div key={car.id} className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
              <div className="relative h-56 bg-gray-100">
                <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
                <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-black ${statusStyles[car.status]}`}>{STATUSES.car[car.status]}</span>
              </div>
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">{car.brand} • {car.category}</p>
                <h3 className="mt-1 text-xl font-black text-gray-900">{car.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">{car.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-gray-500">
                  <span className="rounded-full bg-gray-50 px-3 py-1"><Users className="mr-1 inline h-3 w-3" />{car.seats} lugares</span>
                  <span className="rounded-full bg-gray-50 px-3 py-1"><Fuel className="mr-1 inline h-3 w-3" />{car.fuel}</span>
                  <span className="rounded-full bg-gray-50 px-3 py-1"><Car className="mr-1 inline h-3 w-3" />{car.transmission}</span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
                  <div><p className="text-2xl font-black text-gray-900">{formatCurrency(car.dailyPrice)}</p><p className="text-xs font-bold text-gray-400">por diária</p></div>
                  <button disabled={car.status !== "available"} onClick={() => setSelectedCar(car)} className={`rounded-2xl px-5 py-3 text-sm font-black ${car.status === "available" ? "bg-gold text-white hover:bg-yellow-500" : "cursor-not-allowed bg-gray-100 text-gray-400"}`}>Reservar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
          <p className="font-black text-gray-900">Regras da locadora</p>
          <p className="mt-2 text-sm leading-7 text-gray-500">{company.rules}</p>
        </div>
      </main>

      {selectedCar && <ReservationForm company={company} car={selectedCar} onClose={() => setSelectedCar(null)} onDone={() => { setSelectedCar(null); setDone(true); }} />}
      <Footer />
    </div>
  );
}
