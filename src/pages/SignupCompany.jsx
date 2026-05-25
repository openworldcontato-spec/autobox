import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { createCompany } from "@/lib/storage";
import { formatCurrency } from "@/lib/formatters";

const inputClass = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-yellow-100";
const labelClass = "mb-1.5 block text-xs font-black uppercase tracking-widest text-gray-400";

export default function SignupCompany() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", legalName: "", ownerName: "", email: "", whatsapp: "+55 ", address: "", city: "", state: "" });
  const change = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    const company = createCompany(form);
    navigate(`/admin/empresa?nova=${company.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="h-fit rounded-[2rem] navy-gradient p-8 text-white shadow-2xl lg:sticky lg:top-28">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gold"><Building2 className="h-7 w-7" /></div>
          <p className="text-sm font-black uppercase tracking-widest text-gold">Onboarding</p>
          <h1 className="mt-2 font-playfair text-4xl font-black">Crie o ambiente da locadora</h1>
          <p className="mt-4 text-sm leading-7 text-white/65">Este cadastro cria uma empresa no SaaS, com painel próprio, página pública e dados separados por company_id.</p>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5">
            <p className="text-sm font-black uppercase tracking-widest text-white/50">Plano selecionado</p>
            <p className="mt-2 text-4xl font-black">{formatCurrency(97)}<span className="text-base font-bold text-white/50">/mês</span></p>
            <p className="mt-2 text-sm text-white/65">AutoBox Pro. Pagamento real fica para Stripe/Base44.</p>
          </div>
          <div className="mt-6 space-y-3">
            {["Frota e reservas", "Logo, contato e textos", "Página pública com slug", "Super Admin para você"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-bold text-white/80"><CheckCircle2 className="h-5 w-5 text-gold" /> {item}</div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-900">Dados iniciais</h2>
            <p className="mt-2 text-sm text-gray-500">Depois a locadora edita tudo no painel. Aqui é só criar o tenant.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Nome comercial</label>
              <input className={inputClass} value={form.name} onChange={(e) => change("name", e.target.value)} placeholder="Ex: Silva Rent a Car" required />
            </div>
            <div>
              <label className={labelClass}>Razão social</label>
              <input className={inputClass} value={form.legalName} onChange={(e) => change("legalName", e.target.value)} placeholder="Nome da empresa LTDA" />
            </div>
            <div>
              <label className={labelClass}>Responsável</label>
              <input className={inputClass} value={form.ownerName} onChange={(e) => change("ownerName", e.target.value)} placeholder="Nome do responsável" />
            </div>
            <div>
              <label className={labelClass}>E-mail</label>
              <input type="email" className={inputClass} value={form.email} onChange={(e) => change("email", e.target.value)} placeholder="contato@locadora.com.br" required />
            </div>
            <div>
              <label className={labelClass}>WhatsApp +55</label>
              <input className={inputClass} value={form.whatsapp} onChange={(e) => change("whatsapp", e.target.value)} placeholder="+55 (11) 99999-9999" required />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Endereço</label>
              <input className={inputClass} value={form.address} onChange={(e) => change("address", e.target.value)} placeholder="Rua, número, bairro" />
            </div>
            <div>
              <label className={labelClass}>Cidade</label>
              <input className={inputClass} value={form.city} onChange={(e) => change("city", e.target.value)} placeholder="São Paulo" />
            </div>
            <div>
              <label className={labelClass}>UF</label>
              <input maxLength="2" className={inputClass} value={form.state} onChange={(e) => change("state", e.target.value.toUpperCase())} placeholder="SP" />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/planos" className="text-sm font-black text-gray-500 hover:text-gold">Ver detalhes do plano</Link>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-7 py-4 text-sm font-black text-white shadow-lg shadow-yellow-500/25 hover:bg-yellow-500 active:scale-[0.98]">
              Criar empresa e abrir painel <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
