import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Edit3, Eye, Plus, Shield, Trash2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { createCompany, deleteCompany, getCompanies, getReservationsByCompany, getCarsByCompany, STATUSES, statusStyles, updateCompany } from "@/lib/storage";
import { formatCurrency, formatDateBR } from "@/lib/formatters";

const inputClass = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-yellow-100";

export default function SuperAdmin() {
  const [companies, setCompanies] = useState(getCompanies());
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", ownerName: "", email: "", whatsapp: "+55 ", city: "", state: "" });
  const [query, setQuery] = useState("");

  const reload = () => setCompanies(getCompanies());
  const filtered = useMemo(() => companies.filter((company) => `${company.name} ${company.email} ${company.ownerName} ${company.city}`.toLowerCase().includes(query.toLowerCase())), [companies, query]);

  const submit = (event) => {
    event.preventDefault();
    createCompany(form);
    setForm({ name: "", ownerName: "", email: "", whatsapp: "+55 ", city: "", state: "" });
    setCreating(false);
    reload();
  };

  const toggleBlock = (company) => {
    updateCompany(company.id, { status: company.status === "blocked" ? "active" : "blocked" });
    reload();
  };

  const toggleSubscription = (company) => {
    updateCompany(company.id, { subscriptionStatus: company.subscriptionStatus === "active" ? "overdue" : "active" });
    reload();
  };

  const remove = (company) => {
    if (window.confirm(`Excluir ${company.name}? Isso remove carros e reservas dessa empresa.`)) {
      deleteCompany(company.id);
      reload();
    }
  };

  const totalCars = companies.reduce((sum, company) => sum + getCarsByCompany(company.id).length, 0);
  const totalReservations = companies.reduce((sum, company) => sum + getReservationsByCompany(company.id).length, 0);
  const mrr = companies.filter((company) => company.subscriptionStatus === "active" && company.status !== "blocked").length * 97;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-gold">Super Admin AutoBox</p>
            <h1 className="mt-1 font-playfair text-4xl font-black text-gray-900">Clientes do SaaS</h1>
            <p className="mt-2 text-sm text-gray-500">Controle as empresas que pagam para usar o AutoBox Pro.</p>
          </div>
          <button onClick={() => setCreating((value) => !value)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-navy"><Plus className="h-4 w-4" /> Criar empresa</button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {[{ label: "MRR estimado", value: formatCurrency(mrr), icon: Shield }, { label: "Empresas", value: companies.length, icon: Building2 }, { label: "Carros / Reservas", value: `${totalCars}/${totalReservations}`, icon: Eye }].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
              <Icon className="mb-4 h-6 w-6 text-gold" />
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</p>
              <p className="mt-1 text-3xl font-black text-gray-900">{value}</p>
            </div>
          ))}
        </div>

        {creating && (
          <form onSubmit={submit} className="mb-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-black text-gray-900">Nova empresa SaaS</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input required className={inputClass} placeholder="Nome da locadora" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              <input className={inputClass} placeholder="Responsável" value={form.ownerName} onChange={(e) => setForm((p) => ({ ...p, ownerName: e.target.value }))} />
              <input required type="email" className={inputClass} placeholder="E-mail" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
              <input className={inputClass} placeholder="WhatsApp +55" value={form.whatsapp} onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))} />
              <input className={inputClass} placeholder="Cidade" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} />
              <input className={inputClass} placeholder="UF" maxLength="2" value={form.state} onChange={(e) => setForm((p) => ({ ...p, state: e.target.value.toUpperCase() }))} />
            </div>
            <button type="submit" className="mt-5 rounded-2xl bg-gold px-6 py-3 text-sm font-black text-white hover:bg-yellow-500">Salvar empresa</button>
          </form>
        )}

        <div className="mb-5 rounded-[2rem] border border-gray-100 bg-white p-4 shadow-sm">
          <input value={query} onChange={(e) => setQuery(e.target.value)} className={inputClass} placeholder="Buscar empresa, responsável, e-mail ou cidade..." />
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_1fr_190px] gap-4 border-b border-gray-100 bg-gray-50 px-5 py-4 text-xs font-black uppercase tracking-widest text-gray-400 lg:grid">
            <span>Empresa</span><span>Plano</span><span>Status</span><span>Operação</span><span>Início</span><span>Ações</span>
          </div>
          <div className="divide-y divide-gray-100">
            {filtered.map((company) => {
              const cars = getCarsByCompany(company.id).length;
              const reservations = getReservationsByCompany(company.id).length;
              return (
                <div key={company.id} className="grid gap-4 p-5 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_190px] lg:items-center">
                  <div>
                    <p className="font-black text-gray-900">{company.name}</p>
                    <p className="text-sm text-gray-500">{company.ownerName || "Sem responsável"} • {company.email}</p>
                  </div>
                  <div>
                    <p className="font-black text-gray-900">{company.planName}</p>
                    <p className="text-sm text-gray-500">{formatCurrency(company.planPrice)}/mês</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${statusStyles[company.subscriptionStatus]}`}>{STATUSES.subscription[company.subscriptionStatus]}</span>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${statusStyles[company.status]}`}>{STATUSES.company[company.status]}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-600">{cars} carros • {reservations} reservas</p>
                  <p className="text-sm text-gray-500">{formatDateBR(company.startedAt)}</p>
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/locadora/${company.slug}`} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50" title="Ver página"><Eye className="h-4 w-4" /></Link>
                    <button onClick={() => toggleSubscription(company)} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50" title="Alternar assinatura"><Edit3 className="h-4 w-4" /></button>
                    <button onClick={() => toggleBlock(company)} className="rounded-2xl border border-gray-200 px-3 py-2 text-xs font-black text-gray-600 hover:bg-gray-50">{company.status === "blocked" ? "Ativar" : "Bloquear"}</button>
                    <button onClick={() => remove(company)} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-200 text-red-600 hover:bg-red-50" title="Excluir"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
