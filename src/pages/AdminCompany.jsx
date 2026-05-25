import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe2, Save, Upload } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getCompanyById, getSelectedCompanyId, updateCompany } from "@/lib/storage";

const inputClass = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-yellow-100";
const labelClass = "mb-1.5 block text-xs font-black uppercase tracking-widest text-gray-400";

export default function AdminCompany() {
  const companyId = getSelectedCompanyId();
  const company = getCompanyById(companyId);
  const [form, setForm] = useState(company);
  const [saved, setSaved] = useState(false);

  const change = (key, value) => {
    setSaved(false);
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleLogo = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => change("logoDataUrl", reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCompany(companyId, form);
    setSaved(true);
  };

  const actions = <Link to={`/locadora/${form.slug}`} className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-700 hover:border-gold"><Globe2 className="h-4 w-4" /> Ver página pública</Link>;

  return (
    <AdminShell title="Dados da empresa" subtitle="Nome, logo, contato, regras e textos públicos da locadora." actions={actions}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-gray-900">Identidade da locadora</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-[220px_1fr]">
            <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-5 text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-[2rem] bg-navy text-3xl font-black text-white">
                {form.logoDataUrl ? <img src={form.logoDataUrl} alt="Logo" className="h-full w-full object-cover" /> : form.logo || "AB"}
              </div>
              <label className="mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-navy">
                <Upload className="h-4 w-4" /> Enviar logo
                <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
              </label>
              <p className="mt-2 text-xs text-gray-400">Preview salvo em localStorage.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Nome da empresa</label>
                <input className={inputClass} value={form.name || ""} onChange={(e) => change("name", e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Razão social</label>
                <input className={inputClass} value={form.legalName || ""} onChange={(e) => change("legalName", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Responsável</label>
                <input className={inputClass} value={form.ownerName || ""} onChange={(e) => change("ownerName", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Slug público</label>
                <input className={`${inputClass} bg-gray-50`} value={form.slug || ""} onChange={(e) => change("slug", e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-gray-900">Contato e localização</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>WhatsApp +55</label>
              <input className={inputClass} value={form.whatsapp || ""} onChange={(e) => change("whatsapp", e.target.value)} placeholder="+55 (11) 99999-9999" />
            </div>
            <div>
              <label className={labelClass}>E-mail</label>
              <input type="email" className={inputClass} value={form.email || ""} onChange={(e) => change("email", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Endereço</label>
              <input className={inputClass} value={form.address || ""} onChange={(e) => change("address", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Cidade</label>
              <input className={inputClass} value={form.city || ""} onChange={(e) => change("city", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>UF</label>
              <input maxLength="2" className={inputClass} value={form.state || ""} onChange={(e) => change("state", e.target.value.toUpperCase())} />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-gray-900">Conteúdo público</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className={labelClass}>Título da página pública</label>
              <input className={inputClass} value={form.publicHeadline || ""} onChange={(e) => change("publicHeadline", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Como funciona</label>
              <textarea rows="4" className={inputClass} value={form.howItWorks || ""} onChange={(e) => change("howItWorks", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Texto de contato</label>
              <textarea rows="3" className={inputClass} value={form.contactText || ""} onChange={(e) => change("contactText", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Regras da locadora</label>
              <textarea rows="3" className={inputClass} value={form.rules || ""} onChange={(e) => change("rules", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="sticky bottom-[86px] z-20 rounded-[2rem] border border-gray-100 bg-white/95 p-4 shadow-2xl backdrop-blur lg:bottom-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className={`text-sm font-bold ${saved ? "text-green-700" : "text-gray-500"}`}>{saved ? "Configurações salvas com sucesso." : "Altere e clique em salvar. Botão sem migué."}</p>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-3 text-sm font-black text-white hover:bg-yellow-500 active:scale-[0.98]"><Save className="h-4 w-4" /> Salvar configurações</button>
          </div>
        </div>
      </form>
    </AdminShell>
  );
}
