import { useMemo, useState } from "react";
import { Car, Edit3, Plus, Save, Trash2, X } from "lucide-react";
import { AdminShell, EmptyState, StatusBadge } from "@/components/admin/AdminShell";
import { createCar, deleteCar, getCarsByCompany, getSelectedCompanyId, STATUSES, statusStyles, updateCar } from "@/lib/storage";
import { formatCurrency } from "@/lib/formatters";

const blankCar = (companyId) => ({
  companyId,
  name: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  plate: "",
  category: "Hatch",
  seats: 5,
  transmission: "Automático",
  fuel: "Flex",
  dailyPrice: 0,
  weeklyPrice: 0,
  monthlyPrice: 0,
  deposit: 0,
  status: "available",
  image: "",
  description: "",
  features: "Ar-condicionado, Bluetooth",
});

const inputClass = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-yellow-100";
const labelClass = "mb-1.5 block text-xs font-black uppercase tracking-widest text-gray-400";

function CarForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(initial);
  const change = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    onSave({
      ...form,
      year: Number(form.year || new Date().getFullYear()),
      seats: Number(form.seats || 5),
      dailyPrice: Number(form.dailyPrice || 0),
      weeklyPrice: Number(form.weeklyPrice || 0),
      monthlyPrice: Number(form.monthlyPrice || 0),
      deposit: Number(form.deposit || 0),
      features: String(form.features || "").split(",").map((item) => item.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900">{form.id ? "Editar carro" : "Adicionar carro"}</h2>
          <p className="text-sm text-gray-500">Campos salvos na operação da locadora ativa.</p>
        </div>
        <button type="button" onClick={onCancel} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-50"><X className="h-4 w-4" /></button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <label className={labelClass}>Nome do carro</label>
          <input className={inputClass} value={form.name || ""} onChange={(e) => change("name", e.target.value)} required placeholder="Fiat Mobi Like" />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select className={inputClass} value={form.status} onChange={(e) => change("status", e.target.value)}>
            {Object.entries(STATUSES.car).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Marca</label>
          <input className={inputClass} value={form.brand || ""} onChange={(e) => change("brand", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Modelo</label>
          <input className={inputClass} value={form.model || ""} onChange={(e) => change("model", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Ano</label>
          <input type="number" className={inputClass} value={form.year || ""} onChange={(e) => change("year", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Placa opcional</label>
          <input className={inputClass} value={form.plate || ""} onChange={(e) => change("plate", e.target.value.toUpperCase())} />
        </div>
        <div>
          <label className={labelClass}>Categoria</label>
          <select className={inputClass} value={form.category || "Hatch"} onChange={(e) => change("category", e.target.value)}>
            {["Hatch", "Sedan", "SUV", "Picape", "Van", "Luxo", "Elétrico"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Lugares</label>
          <input type="number" className={inputClass} value={form.seats || ""} onChange={(e) => change("seats", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Câmbio</label>
          <select className={inputClass} value={form.transmission || "Automático"} onChange={(e) => change("transmission", e.target.value)}>
            <option>Automático</option><option>Manual</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Combustível</label>
          <select className={inputClass} value={form.fuel || "Flex"} onChange={(e) => change("fuel", e.target.value)}>
            <option>Flex</option><option>Gasolina</option><option>Diesel</option><option>Elétrico</option><option>Híbrido</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Diária R$</label>
          <input type="number" className={inputClass} value={form.dailyPrice || ""} onChange={(e) => change("dailyPrice", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Semanal R$</label>
          <input type="number" className={inputClass} value={form.weeklyPrice || ""} onChange={(e) => change("weeklyPrice", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Mensal R$</label>
          <input type="number" className={inputClass} value={form.monthlyPrice || ""} onChange={(e) => change("monthlyPrice", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Caução R$</label>
          <input type="number" className={inputClass} value={form.deposit || ""} onChange={(e) => change("deposit", e.target.value)} />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className={labelClass}>URL da foto</label>
          <input className={inputClass} value={form.image || ""} onChange={(e) => change("image", e.target.value)} placeholder="https://..." />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className={labelClass}>Descrição</label>
          <textarea rows="3" className={inputClass} value={form.description || ""} onChange={(e) => change("description", e.target.value)} />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className={labelClass}>Itens separados por vírgula</label>
          <input className={inputClass} value={Array.isArray(form.features) ? form.features.join(", ") : form.features || ""} onChange={(e) => change("features", e.target.value)} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-black text-gray-700 hover:bg-gray-50">Cancelar</button>
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-3 text-sm font-black text-white hover:bg-yellow-500"><Save className="h-4 w-4" /> Salvar carro</button>
      </div>
    </form>
  );
}

export default function AdminCars() {
  const companyId = getSelectedCompanyId();
  const [cars, setCars] = useState(getCarsByCompany(companyId));
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => cars.filter((car) => `${car.name} ${car.brand} ${car.model} ${car.plate}`.toLowerCase().includes(search.toLowerCase())), [cars, search]);

  const reload = () => setCars(getCarsByCompany(companyId));
  const save = (payload) => {
    if (payload.id) updateCar(payload.id, payload);
    else createCar({ ...payload, companyId });
    setEditing(null);
    reload();
  };

  const remove = (id) => {
    if (window.confirm("Excluir este carro da frota?")) {
      deleteCar(id);
      reload();
    }
  };

  const actions = <button onClick={() => setEditing(blankCar(companyId))} className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-navy"><Plus className="h-4 w-4" /> Adicionar carro</button>;

  return (
    <AdminShell title="Carros" subtitle="Adicione, edite, exclua e controle status da frota da locadora." actions={actions}>
      {editing && <div className="mb-6"><CarForm initial={editing} onCancel={() => setEditing(null)} onSave={save} /></div>}

      <div className="mb-5 rounded-[2rem] border border-gray-100 bg-white p-4 shadow-sm">
        <input value={search} onChange={(e) => setSearch(e.target.value)} className={inputClass} placeholder="Buscar por nome, marca, modelo ou placa..." />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Car} title="Nenhum carro encontrado" text="Cadastre o primeiro veículo da locadora. Sem frota, sem reserva. Matemática fria." action={<button onClick={() => setEditing(blankCar(companyId))} className="rounded-2xl bg-gold px-6 py-3 text-sm font-black text-white">Adicionar carro</button>} />
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((car) => (
            <div key={car.id} className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
              <div className="relative h-52 bg-gray-100">
                <img src={car.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&q=80"} alt={car.name} className="h-full w-full object-cover" />
                <div className="absolute left-4 top-4"><StatusBadge label={STATUSES.car[car.status]} className={statusStyles[car.status]} /></div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">{car.brand} • {car.category}</p>
                    <h3 className="text-xl font-black text-gray-900">{car.name}</h3>
                    <p className="text-sm text-gray-500">{car.year} • {car.transmission} • {car.fuel} • {car.seats} lugares</p>
                  </div>
                  <p className="text-right text-2xl font-black text-gray-900">{formatCurrency(car.dailyPrice)}<span className="block text-xs font-bold text-gray-400">/dia</span></p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-2xl bg-gray-50 p-3"><p className="text-xs text-gray-400">Semanal</p><p className="font-black">{formatCurrency(car.weeklyPrice)}</p></div>
                  <div className="rounded-2xl bg-gray-50 p-3"><p className="text-xs text-gray-400">Mensal</p><p className="font-black">{formatCurrency(car.monthlyPrice)}</p></div>
                  <div className="rounded-2xl bg-gray-50 p-3"><p className="text-xs text-gray-400">Caução</p><p className="font-black">{formatCurrency(car.deposit)}</p></div>
                </div>
                <div className="mt-5 flex gap-2">
                  <button onClick={() => setEditing({ ...car, features: car.features?.join(", ") })} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-black text-gray-700 hover:bg-gray-50"><Edit3 className="h-4 w-4" /> Editar</button>
                  <button onClick={() => remove(car.id)} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 px-4 py-3 text-sm font-black text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /> Excluir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
