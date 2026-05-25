import { useState } from "react";
import { Package, Plus, Save, Trash2 } from "lucide-react";
import { AdminShell, EmptyState } from "@/components/admin/AdminShell";
import { getCompanyById, getSelectedCompanyId, updateCompany } from "@/lib/storage";

const inputClass = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-yellow-100";

export default function AdminPlans() {
  const companyId = getSelectedCompanyId();
  const company = getCompanyById(companyId) || {};
  const [packages, setPackages] = useState(company.packages || []);
  const [saved, setSaved] = useState(false);

  const addPackage = () => {
    setSaved(false);
    setPackages((previous) => [{ id: `pkg_${Date.now()}`, name: "Novo pacote", description: "Descrição do pacote de aluguel.", enabled: true }, ...previous]);
  };

  const change = (id, key, value) => {
    setSaved(false);
    setPackages((previous) => previous.map((item) => item.id === id ? { ...item, [key]: value } : item));
  };

  const remove = (id) => {
    setSaved(false);
    setPackages((previous) => previous.filter((item) => item.id !== id));
  };

  const save = () => {
    updateCompany(companyId, { packages });
    setSaved(true);
  };

  const actions = <button onClick={addPackage} className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-navy"><Plus className="h-4 w-4" /> Novo pacote</button>;

  return (
    <AdminShell title="Pacotes da locadora" subtitle="Estes pacotes são da empresa, não do seu SaaS. Seu SaaS continua R$97/mês." actions={actions}>
      <div className="mb-5 rounded-[2rem] border border-yellow-200 bg-yellow-50 p-5">
        <p className="font-black text-yellow-900">Importante</p>
        <p className="mt-1 text-sm text-yellow-800">A locadora pode oferecer diária, semanal, mensal, km livre, km controlado, com motorista etc. Isso não altera o plano AutoBox Pro cobrado por você.</p>
      </div>

      {packages.length === 0 ? (
        <EmptyState icon={Package} title="Nenhum pacote cadastrado" text="Crie opções comerciais próprias da locadora, como diária, semanal e mensal." action={<button onClick={addPackage} className="rounded-2xl bg-gold px-6 py-3 text-sm font-black text-white">Criar pacote</button>} />
      ) : (
        <div className="space-y-4">
          {packages.map((item) => (
            <div key={item.id} className="rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm">
              <div className="grid gap-4 lg:grid-cols-[240px_1fr_auto] lg:items-center">
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-gray-400">Nome</label>
                  <input className={inputClass} value={item.name} onChange={(event) => change(item.id, "name", event.target.value)} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-gray-400">Descrição</label>
                  <input className={inputClass} value={item.description} onChange={(event) => change(item.id, "description", event.target.value)} />
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => change(item.id, "enabled", !item.enabled)} className={`rounded-2xl px-4 py-3 text-sm font-black ${item.enabled ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.enabled ? "Ativo" : "Inativo"}</button>
                  <button onClick={() => remove(item.id)} className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-200 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="sticky bottom-[86px] z-20 mt-6 rounded-[2rem] border border-gray-100 bg-white/95 p-4 shadow-2xl backdrop-blur lg:bottom-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className={`text-sm font-bold ${saved ? "text-green-700" : "text-gray-500"}`}>{saved ? "Pacotes salvos." : "Alterou? Salva antes de sair."}</p>
          <button onClick={save} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-3 text-sm font-black text-white hover:bg-yellow-500"><Save className="h-4 w-4" /> Salvar pacotes</button>
        </div>
      </div>
    </AdminShell>
  );
}